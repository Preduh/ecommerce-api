import { AlreadyExistsError } from '../../infra/errors/alreadyExistsError'
import { MissingParamError } from '../../infra/errors/missingParamError'
import { NotFoundError } from '../../infra/errors/notFoundError'
import {
  type UserRepository,
  type UserWithoutPassword
} from './repositories/UserRepository'

class BlockUserService {
  constructor (private readonly userRepository: UserRepository) {}

  async execute (id: string): Promise<UserWithoutPassword> {
    if (id === '') {
      throw new MissingParamError('Missing param: id')
    }

    const findUser = await this.userRepository.findUserById(id)

    if (findUser === null) {
      throw new NotFoundError('User not found')
    }

    if (findUser.isBlocked) {
      throw new AlreadyExistsError('This user already is blocked')
    }

    const blockUser = await this.userRepository.blockUser(id)

    if (blockUser === null) {
      throw new NotFoundError('User not found')
    }

    return {
      id: blockUser.id,
      email: blockUser.email,
      firstName: blockUser.firstName,
      lastName: blockUser.lastName,
      mobile: blockUser.mobile,
      role: blockUser.role,
      isBlocked: blockUser.isBlocked,
      refreshToken: findUser.refreshToken,
      createdAt: blockUser.createdAt,
      updatedAt: blockUser.updatedAt
    }
  }
}

export { BlockUserService }
