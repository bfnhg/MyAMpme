using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AM_PME_ASP_API.Entities;
using AM_PME_ASP_API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace AM_PME_ASP_API.Repositories.Imp
{
    public class AuthRepository : IAuthRepository
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;

        public AuthRepository(IConfiguration configuration, UserManager<User> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<Tokens> Auth(string login, string password)
        {
            var user = await _userManager.FindByNameAsync(login);

            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
            {
                return null;
            }

            var roles = await _userManager.GetRolesAsync(user);

            return GenerateTokens(user, roles);
        }

        public async Task<Tokens> ReAuth(Tokens tokens)
        {
            var handler = new JwtSecurityTokenHandler();

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Jwt:SecretKey"] ?? throw new Exception("JWT secret key is missing from the configuration"))),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };

            SecurityToken securityToken;

            try
            {
                var claimsPrincipal = handler.ValidateToken(tokens.AccessToken, validationParameters, out securityToken);
                var usernameClaim = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier);

                if (usernameClaim == null)
                {
                    return null;
                }

                var userId = usernameClaim.Value;
                var user = await _userManager.FindByIdAsync(userId);

                if (user == null) return null;

                var roles = await _userManager.GetRolesAsync(user);

                return GenerateTokens(user, roles);
            }
            catch (Exception)
            {
                return null;
            }
        }

        private Tokens GenerateTokens(User user, IList<string> roles)
        {
            var jwtSecretKey = _configuration["Jwt:SecretKey"];

            if (jwtSecretKey == null)
            {
                throw new Exception("JWT secret key is missing from the configuration");
            }

            var jwtIssuer = _configuration["Jwt:Issuer"];
            var jwtAudience = _configuration["Jwt:Audience"];
            var jwtAccessExpiration = Convert.ToInt32(_configuration["Jwt:AccessExpirationMinutes"]);
            var jwtRefreshExpiration = Convert.ToInt32(_configuration["Jwt:RefreshExpirationDays"]);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtSecretKey);

            var claims = new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, user.Id) });

            foreach (var role in roles)
            {
                claims.AddClaim(new Claim(ClaimTypes.Role, role));
            }

            var accessTokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = jwtIssuer,
                Audience = jwtAudience,
                Subject = claims,
                Expires = DateTime.UtcNow.AddMinutes(jwtAccessExpiration),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var accessToken = tokenHandler.CreateToken(accessTokenDescriptor);
            var refreshToken = Guid.NewGuid().ToString();

            var tokens = new Tokens
            {
                AccessToken = tokenHandler.WriteToken(accessToken),
                RefreshToken = refreshToken,
                AccessExpiration = DateTime.UtcNow.AddMinutes(jwtAccessExpiration),
                RefreshExpiration = DateTime.UtcNow.AddDays(jwtRefreshExpiration)
            };
            return tokens;
        }

        public async Task<string> RenewAccessToken(string refreshToken)
        {
            var handler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Jwt:SecretKey"] ?? throw new Exception("JWT secret key is missing from the configuration"))),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            };

            SecurityToken securityToken;
            try
            {
                var claimsPrincipal = handler.ValidateToken(refreshToken, validationParameters, out securityToken);
                var userIdClaim = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier);
                var userId = userIdClaim.Value;
                var user = await _userManager.FindByIdAsync(userId);

                if (user == null) return null;

                var roles = await _userManager.GetRolesAsync(user);

                var accessToken = GenerateAccessToken(user, roles);

                return accessToken;
            }
            catch (Exception)
            {
                return null;
            }
        }

        private string GenerateAccessToken(User user, IList<string> roles)
        {
            var jwtSecretKey = _configuration["Jwt:SecretKey"];

            if (jwtSecretKey == null)
            {
                throw new Exception("JWT secret key is missing from the configuration");
            }

            var jwtIssuer = _configuration["Jwt:Issuer"];
            var jwtAudience = _configuration["Jwt:Audience"];
            var jwtAccessExpiration = Convert.ToInt32(_configuration["Jwt:AccessExpirationMinutes"]);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtSecretKey);

            var claims = new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, user.Id) });

            foreach (var role in roles)
            {
                claims.AddClaim(new Claim(ClaimTypes.Role, role));
            }

            var accessTokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = jwtIssuer,
                Audience = jwtAudience,
                Subject = claims,
                Expires = DateTime.UtcNow.AddMinutes(jwtAccessExpiration),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var accessToken = tokenHandler.CreateToken(accessTokenDescriptor);

            return tokenHandler.WriteToken(accessToken);
        }
    }
}
