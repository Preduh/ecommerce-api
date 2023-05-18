export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  isAdmin: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserDTO {
  firstName: string
  lastName: string
  email: string
  mobile: string
  password: string
}

export interface UpdateUserDTO {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  mobile?: string
}

// A user without your password
export interface UserWithoutPassword {
  id: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  isAdmin: string
  createdAt: Date
  updatedAt: Date
}

export interface UserRepository {
  createUser: (user: CreateUserDTO) => Promise<User>
  findAllUsers: () => Promise<User[]>
  findUserByEmail: (email: string) => Promise<User | null>
  findUserByMobile: (mobile: string) => Promise<User | null>
  findUserById: (id: string) => Promise<User | null>
  deleteUser: (id: string) => Promise<User | null>
  updateUser: (user: UpdateUserDTO) => Promise<User | null>
}
