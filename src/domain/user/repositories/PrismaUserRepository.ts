import { type User } from '@prisma/client'
import { v4 as uuid } from 'uuid'
import { prismaClient } from '../../../database/prismaClient'
import { type CreateUserDTO, type UserRepository } from './UserRepository'

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
}
