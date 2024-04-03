export default {
  meEndpoint: '/api/users/me',
  loginEndpoint: '/api/auth/local',
  registerEndpoint: '/api/auth/local/register',
  changePasswordEndpoint: '/api/auth/change-password',
  forgotPasswordEndpoint: '/api/auth/forgot-password',
  resetPasswordEndpoint: '/api/auth/reset-password',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'logout' // logout | refreshToken
}
