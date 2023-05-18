import { describe, expect, it } from 'vitest'
import { CreateUserService } from './user.create.service'
import { InMemoryUserRepository } from './repositories/InMemoryRepository'
import { AlreadyExistsError } from '../../infra/errors/alreadyExistsError'
import { MissingParamError } from '../../infra/errors/missingParamError'

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

  it('should not be able to create a new user with an existing email', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const createUserService = new CreateUserService(inMemoryUserRepository)

    await createUserService.execute({
      email: 'any@mail.com',
      firstName: 'Any firstname',
      lastName: 'Any lastname',
      mobile: '38999999999',
      password: 'Any password'
    })

    await expect(
      createUserService.execute({
        email: 'any@mail.com',
        firstName: 'Another firstname',
        lastName: 'Another lastname',
        mobile: '38999999998',
        password: 'Another password'
      })
    ).rejects.toEqual(new AlreadyExistsError('This email already exists'))
  })

  it('should not be able to create a new user with an existing mobile', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const createUserService = new CreateUserService(inMemoryUserRepository)

    await createUserService.execute({
      email: 'any@mail.com',
      firstName: 'Any firstname',
      lastName: 'Any lastname',
      mobile: '38999999999',
      password: 'Any password'
    })

    await expect(
      createUserService.execute({
        email: 'another@mail.com',
        firstName: 'Another firstname',
        lastName: 'Another lastname',
        mobile: '38999999999',
        password: 'Another password'
      })
    ).rejects.toEqual(new AlreadyExistsError('This phone number already exists'))
  })

  it('should not be able to create a new user if firstname is empty', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const createUserService = new CreateUserService(inMemoryUserRepository)

    await expect(
      createUserService.execute({
        email: 'any@mail.com',
        firstName: '',
        lastName: 'Any lastname',
        mobile: '38999999999',
        password: 'Any password'
      })
    ).rejects.toEqual(new MissingParamError('Missing param: firstName'))
  })
})
