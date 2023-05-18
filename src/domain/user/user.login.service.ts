import bcrypt from 'bcrypt'
import { NotFoundError } from '../../infra/errors/notFoundError'
import { type UserRepository, type UserWithoutPassword } from './repositories/UserRepository'
import jwt from 'jsonwebtoken'
import { jwtConfig } from '../../config/jwt.config'

interface LoginUserDTO {
  email: string
  password: string
}

interface LoginResponseDTO {
  user: UserWithoutPassword
  token: string
}

class LoginUserService {
  constructor (private readonly userRepository: UserRepository) {}

  async execute ({ email, password }: LoginUserDTO): Promise<LoginResponseDTO> {
    const user = await this.userRepository.findUserByEmail(email)

    if (user === null) {
      throw new NotFoundError('Email/Password is incorrect')
    }

    const passwordIsValid = await bcrypt.compare(password, user.password)

    if (!passwordIsValid) {
      throw new NotFoundError('Email/Password is incorrect')
    }

    const token = jwt.sign({ id: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token
    }
  }
}

export { LoginUserService }
