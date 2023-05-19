import { v4 as uuid } from 'uuid'
import { prismaClient } from '../../../database/prismaClient'
import { type UpdateUserDTO, type CreateUserDTO, type UserRepository, type User } from './UserRepository'

export class PrismaUserRepository implements UserRepository {
  async createUser ({
    email,
    firstName,
    lastName,
    mobile,
    password
  }: CreateUserDTO): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        id: uuid(),
        firstName,
        lastName,
        email,
        mobile,
        password
      }
    })

    return user
  }

  async findAllUsers (): Promise<User[]> {
    const users = await prismaClient.user.findMany()

    return users
  }

  async findUserByEmail (email: string): Promise<User | null> {
    const user = await prismaClient.user.findFirst({
      where: {
        email
      }
    })

    return user
  }

  async findUserByMobile (mobile: string): Promise<User | null> {
    const user = await prismaClient.user.findFirst({
      where: {
        mobile
      }
    })

    return user
  }

  async findUserById (id: string): Promise<User | null> {
    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    })

    return user
  }

  async deleteUser (id: string): Promise<User | null> {
    const user = await prismaClient.user.delete({
      where: {
        id
      }
    })

    return user
  }

  async updateUser (user: UpdateUserDTO): Promise<User | null> {
    const updatedUser = await prismaClient.user.update({
      where: {
        id: user.id
      },
      data: {
        ...user
      }
    })

    return updatedUser
  }

  async blockUser (id: string): Promise<User | null> {
    const user = await prismaClient.user.update({
      where: {
        id
      },
      data: {
        isBlocked: true
      }
    })

    return user
  }

  async unblockUser (id: string): Promise<User | null> {
    const user = await prismaClient.user.update({
      where: {
        id
      },
      data: {
        isBlocked: false
      }
    })

    return user
  }
}
