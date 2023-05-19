import { v4 as uuid } from 'uuid'
import { type UpdateUserDTO, type CreateUserDTO, type UserRepository, type User } from './UserRepository'

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = []

  async createUser ({
    email,
    firstName,
    lastName,
    isBlocked,
    role,
    mobile,
    password
  }: CreateUserDTO): Promise<User> {
    const user: User = {
      id: uuid(),
      firstName,
      lastName,
      role: role ?? 'user',
      isBlocked: isBlocked ?? false,
      email,
      mobile,
      password,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.users.push(user)

    return user
  }

  async findAllUsers (): Promise<User[]> {
    return this.users
  }

  async findUserByEmail (email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email)

    return user ?? null
  }

  async findUserByMobile (mobile: string): Promise<User | null> {
    const user = this.users.find(user => user.mobile === mobile)

    return user ?? null
  }

  async findUserById (id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id)

    return user ?? null
  }

  async deleteUser (id: string): Promise<User | null> {
    const user = await this.findUserById(id)

    if (user !== null) {
      const userIdx = this.users.findIndex(user => user.id === id)
      this.users.splice(userIdx, 1)
    }

    return user ?? null
  }

  async updateUser (user: UpdateUserDTO): Promise<User | null> {
    const oldUser = await this.deleteUser(user.id)

    if (oldUser === null) return null

    const newUser = await this.createUser({
      ...oldUser,
      ...user
    })

    return newUser
  }

  async blockUser (id: string): Promise<User | null> {
    const oldUser = await this.deleteUser(id)

    if (oldUser === null) return null

    const newUser = await this.createUser({
      ...oldUser,
      isBlocked: true
    })

    return newUser
  }

  async unblockUser (id: string): Promise<User | null> {
    const oldUser = await this.deleteUser(id)

    if (oldUser === null) return null

    const newUser = await this.createUser({
      ...oldUser,
      isBlocked: false
    })

    return newUser
  }
}
