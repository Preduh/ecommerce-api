import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { bcryptConfig } from '../../config/bcrypt.config'
import { jwtConfig } from '../../config/jwt.config'
import { AlreadyExistsError } from '../../infra/errors/alreadyExistsError'
import {
  type CreateUserDTO,
  type UserRepository,
  type UserWithoutPassword
} from './repositories/UserRepository'
import { MissingParamError } from '../../infra/errors/missingParamError'

interface CreateResponseDTO {
  user: UserWithoutPassword
  token: string
}

class CreateUserService {
  constructor (private readonly userRepository: UserRepository) {}

  async execute ({
    email,
    firstName,
    lastName,
    password,
    mobile
  }: CreateUserDTO): Promise<CreateResponseDTO> {
    if (firstName === undefined || firstName === '') {
      throw new MissingParamError('Missing param: firstName')
    }

    const findUserEmail = await this.userRepository.findUserByEmail(email)

    if (findUserEmail !== null) {
      throw new AlreadyExistsError('This email already exists')
    }

    const findUserMobile = await this.userRepository.findUserByMobile(mobile)

    if (findUserMobile !== null) {
      throw new AlreadyExistsError('This phone number already exists')
    }

    const hashedPassword = await bcrypt.hash(password, bcryptConfig.saltRounds)

    const user = await this.userRepository.createUser({
      email,
      firstName,
      lastName,
      mobile,
      password: hashedPassword
    })

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
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      token
    }
  }
}

export { CreateUserService }
