import { describe, expect, it } from 'vitest'
import { CreateUserService } from './user.create.service'
import { InMemoryUserRepository } from './repositories/InMemoryRepository'

describe('Create user', () => {
  it('should be able to create a new user', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const createUserService = new CreateUserService(inMemoryUserRepository)

    const { user, token } = await createUserService.execute({
      email: 'any@mail.com',
      firstName: 'Any firstname',
      lastName: 'Any lastname',
      mobile: '38999999999',
      password: 'Any password'
    })

    expect(user).toHaveProperty('id')
    expect(token).toBeDefined()
  })
})
