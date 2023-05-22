export const jwtConfig = {
  secret: process.env.JWT_SECRET ?? 'default secret',
  refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'default refresh secret',
  tokenExpiresIn: '1d',
  refreshTokenExpiresIn: '3d'
}
