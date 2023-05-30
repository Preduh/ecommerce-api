import { type NextFunction, type Request, type Response } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { jwtConfig } from '../config/jwt.config'

class AuthMiddleware {
  async validateToken (request: Request,
    response: Response,
    next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    const fullToken = request.headers.authorization

    if (fullToken === undefined) {
      return response.status(401).json({ error: 'Token is missing' })
    }

    if (!fullToken.startsWith('Bearer')) {
      return response.status(401).json({ error: 'Invalid token' })
    }

    const token = fullToken.split(' ')[1]

    try {
      const decodedToken = jwt.verify(token, jwtConfig.secret) as JwtPayload

      response.locals.userId = decodedToken.id
      response.locals.role = decodedToken.role

      next()
    } catch (error) {
      return response.status(401).json({ error: 'Invalid token' })
    }
  }

  async isAdmin (request: Request,
    response: Response,
    next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> {
    const role = response.locals.role

    console.log(role)

    if (role !== 'admin') {
      return response.status(401).json({ error: 'You are not an admin' })
    }

    next()
  }
}

export { AuthMiddleware }
