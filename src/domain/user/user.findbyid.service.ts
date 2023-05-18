import { NotFoundError } from '../../infra/errors/notFoundError'
import {
  type UserRepository,
  type UserWithoutPassword
} from './repositories/UserRepository'

class FindUserByIDService {
  constructor (private readonly userRepository: UserRepository) {}

  async execute (id: string): Promise<UserWithoutPassword> {
    const findUser = await this.userRepository.findUserById(id)

    if (findUser === null) {
      throw new NotFoundError('User not found')
    }

    return {
      id: findUser.id,
      email: findUser.email,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      mobile: findUser.mobile,
      role: findUser.role,
      createdAt: findUser.createdAt,
      updatedAt: findUser.updatedAt
    }
  }
}

export { FindUserByIDService }
