import { type Request, type Response } from 'express'
import { type UserRepository } from './repositories/UserRepository'
import { UnauthorizedError } from '../../infra/errors/unauthorizedError'
import jwt from 'jsonwebtoken'
import { jwtConfig } from '../../config/jwt.config'
import { FindUserByIDService } from './user.findbyid.service'

class LogoutUserService {
  constructor (private readonly userRepository: UserRepository) {}

  async execute (request: Request, response: Response): Promise<void> {
    const refreshToken = request.cookies.refreshToken

    if (refreshToken === '' || refreshToken === undefined) {
      throw new UnauthorizedError('No refresh token in cookies')
    }

    try {
      const payload = jwt.verify(refreshToken, jwtConfig.refreshSecret)

      const userId = Object(payload).id

      const findUserByIDService = new FindUserByIDService(this.userRepository)
      const user = await findUserByIDService.execute(userId)

      await this.userRepository.updateUser({
        id: user.id,
        refreshToken: ''
      })

      response.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
      })
    } catch (error) {
      response.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
      })
    }
  }
}

export { LogoutUserService }
