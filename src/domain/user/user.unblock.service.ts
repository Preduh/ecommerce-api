import { AlreadyExistsError } from '../../infra/errors/alreadyExistsError'
import { MissingParamError } from '../../infra/errors/missingParamError'
import { NotFoundError } from '../../infra/errors/notFoundError'
import {
  type UserRepository,
  type UserWithoutPassword
} from './repositories/UserRepository'

class UnblockUserService {
  constructor (private readonly userRepository: UserRepository) {}

  async execute (id: string): Promise<UserWithoutPassword> {
    if (id === '') {
      throw new MissingParamError('Missing param: id')
    }

    const findUser = await this.userRepository.findUserById(id)

    if (findUser === null) {
      throw new NotFoundError('User not found')
    }

    if (!findUser.isBlocked) {
      throw new AlreadyExistsError('This user already is unblocked')
    }

    const unblockUser = await this.userRepository.unblockUser(id)

    if (unblockUser === null) {
      throw new NotFoundError('User not found')
    }

    return {
      id: unblockUser.id,
      email: unblockUser.email,
      firstName: unblockUser.firstName,
      lastName: unblockUser.lastName,
      mobile: unblockUser.mobile,
      role: unblockUser.role,
      isBlocked: unblockUser.isBlocked,
      refreshToken: findUser.refreshToken,
      createdAt: unblockUser.createdAt,
      updatedAt: unblockUser.updatedAt
    }
  }
}

export { UnblockUserService }
