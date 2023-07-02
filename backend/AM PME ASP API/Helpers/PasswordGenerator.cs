using System;
using System.Text;

namespace AM_PME_ASP_API.Helpers
{
    public class PasswordGenerator
    {
        private const string LOWERCASE_CHARACTERS = "abcdefghijklmnopqrstuvwxyz";
        private const string UPPERCASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private const string DIGIT_CHARACTERS = "0123456789";
        private const string SPECIAL_CHARACTERS = @"!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

        private readonly Random _random = new Random();

        public string GeneratePassword(int length, bool includeLowercase = true, bool includeUppercase = true,
            bool includeDigits = true, bool includeSpecialChars = false)
        {
            var availableChars = "";

            if (includeLowercase)
            {
                availableChars += LOWERCASE_CHARACTERS;
            }

            if (includeUppercase)
            {
                availableChars += UPPERCASE_CHARACTERS;
            }

            if (includeDigits)
            {
                availableChars += DIGIT_CHARACTERS;
            }

            if (includeSpecialChars)
            {
                availableChars += SPECIAL_CHARACTERS;
            }

            if (availableChars.Length == 0)
            {
                throw new ArgumentException("At least one character set must be included in the available characters.");
            }

            var passwordChars = new char[length];

            for (int i = 0; i < length; i++)
            {
                passwordChars[i] = availableChars[_random.Next(availableChars.Length)];
            }

            return new string(passwordChars);
        }
    }

}

