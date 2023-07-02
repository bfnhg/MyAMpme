import process from 'process'

export default {
  meEndpoint: process.env.NEXT_PUBLIC_SERVER_URL + 'Users/me',
  loginEndpoint: process.env.NEXT_PUBLIC_SERVER_URL + 'Auths/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}
