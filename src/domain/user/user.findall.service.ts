import { NotFoundError } from '../../infra/errors/notFoundError'
import {
  type UserRepository,
  type UserWithoutPassword
} from './repositories/UserRepository'

class FindAllUserService {
  constructor (private readonly userRepository: UserRepository) {}

  async execute (): Promise<UserWithoutPassword[]> {
    const findUsers = await this.userRepository.findAllUsers()

    if (findUsers.length === 0) {
      throw new NotFoundError('No user was found')
    }

    return findUsers.map((findUser) => {
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
    })
  }
}

export { FindAllUserService }
