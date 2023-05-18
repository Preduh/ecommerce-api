import { AlreadyExistsError } from '../../infra/errors/alreadyExistsError'
import { InvalidParamsError } from '../../infra/errors/invalidParamsError'
import { NotFoundError } from '../../infra/errors/notFoundError'
import {
  type UpdateUserDTO,
  type UserRepository,
  type UserWithoutPassword
} from './repositories/UserRepository'

class UpdateUserService {
  constructor (private readonly userRepository: UserRepository) {}

  async execute ({
    id,
    email,
    firstName,
    lastName,
    mobile,
    ...otherProperties
  }: UpdateUserDTO): Promise<UserWithoutPassword> {
    const invalidProperties = Object.keys(otherProperties)

    let invalidParams: string = ''

    invalidProperties.forEach((invalidProperty, idx) => {
      if (idx === 0) {
        invalidParams = invalidParams.concat(`'${invalidProperty}'`)
      } else {
        invalidParams = invalidParams.concat(`, '${invalidProperty}'`)
      }
    })

    if (invalidProperties.length > 0) {
      throw new InvalidParamsError(`Invalid params: ${invalidParams}`)
    }

    if (email !== undefined) {
      const findUserEmail = await this.userRepository.findUserByEmail(email)

      if (findUserEmail !== null) {
        throw new AlreadyExistsError('This email already exists')
      }
    }

    if (mobile !== undefined) {
      const findUserMobile = await this.userRepository.findUserByMobile(mobile)

      if (findUserMobile !== null) {
        throw new AlreadyExistsError('This phone number already exists')
      }
    }

    const updatedUser = await this.userRepository.updateUser({
      id,
      email,
      firstName,
      lastName,
      mobile
    })

    if (updatedUser === null) {
      throw new NotFoundError('User not found')
    }

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      mobile: updatedUser.mobile,
      isAdmin: updatedUser.isAdmin,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    }
  }
}

export { UpdateUserService }
