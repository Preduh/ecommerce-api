import { describe, expect, it } from 'vitest'
import { NotFoundError } from '../../infra/errors/notFoundError'
import { InMemoryUserRepository } from './repositories/InMemoryRepository'
import { CreateUserService } from './user.create.service'
import { DeleteUserService } from './user.delete.service'
import { FindAllUserService } from './user.findall.service'

describe('Delete user', () => {
  it('should delete a user', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository()
    const createUserService = new CreateUserService(inMemoryUserRepository)
    const deleteUserService = new DeleteUserService(inMemoryUserRepository)
    const findAllUserService = new FindAllUserService(inMemoryUserRepository)

    await createUserService.execute({
      email: 'any@mail.com',
      firstName: 'Any firstname',
      lastName: 'Any lastname',
      mobile: '38999999999',
      password: 'Any password'
    })

    const users = await findAllUserService.execute()

    await deleteUserService.execute(users[0].id)

    await expect(findAllUserService.execute()).rejects.toEqual(
      new NotFoundError('No user was found')
    )
  })
})
