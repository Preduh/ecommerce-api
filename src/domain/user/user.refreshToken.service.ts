import { jwtConfig } from '../../config/jwt.config'
import { UnauthorizedError } from '../../infra/errors/unauthorizedError'
import { type UserRepository } from './repositories/UserRepository'
import jwt from 'jsonwebtoken'
import { FindUserByIDService } from './user.findbyid.service'

interface RefreshTokenReturn {
  accessToken: string
  refreshToken: string
}

export class RefreshTokenUserService {
  constructor (private readonly userRepository: UserRepository) {}

  async execute (refreshToken: string): Promise<RefreshTokenReturn> {
    if (refreshToken === '' || refreshToken === undefined) {
      throw new UnauthorizedError('No refresh token in cookies')
    }

    try {
      const payload = jwt.verify(refreshToken, jwtConfig.refreshSecret)

      const userId = Object(payload).id

      const findUserByIDService = new FindUserByIDService(this.userRepository)
      const user = await findUserByIDService.execute(userId)

      const accessToken = jwt.sign({ id: user.id, role: user.role }, jwtConfig.secret, {
        expiresIn: jwtConfig.tokenExpiresIn
      })

      const newRefreshToken = jwt.sign({ id: user.id, role: user.role }, jwtConfig.refreshSecret, {
        expiresIn: jwtConfig.refreshTokenExpiresIn
      })

      await this.userRepository.updateUser({
        id: user.id,
        refreshToken: newRefreshToken
      })

      return {
        accessToken,
        refreshToken: newRefreshToken
      }
    } catch (error) {
      throw new UnauthorizedError('Invalid refresh token')
    }
  }
}
