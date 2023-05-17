import { type Request, type Response } from 'express'
import { PrismaUserRepository } from './repositories/PrismaUserRepository'
import { CreateUserService } from './user.create.service'
import { FindAllUserService } from './user.findall.service'
import { type NotFoundError } from '../../infra/errors/notFoundError'
import { type AlreadyExistsError } from '../../infra/errors/alreadyExistsError'
import { LoginUserService } from './user.login.service'
import { FindUserByIDService } from './user.findbyid.service'

class UserController {
  async create (
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const prismaUserRepository = new PrismaUserRepository()
    const createUserService = new CreateUserService(prismaUserRepository)

    const { email, firstName, lastName, mobile, password } = request.body

    try {
      const user = await createUserService.execute({
        firstName,
        lastName,
        email,
        mobile,
        password
      })

      return response.status(201).json(user)
    } catch (error) {
      const httpError: AlreadyExistsError = error as AlreadyExistsError

      return response.status(httpError.status).json({ error: httpError.message })
    }
  }

  async findAll (
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const prismaUserRepository = new PrismaUserRepository()
    const findAllUserService = new FindAllUserService(prismaUserRepository)

    try {
      const users = await findAllUserService.execute()

      return response.status(200).json(users)
    } catch (error) {
      const httpError: NotFoundError = error as NotFoundError

      return response.status(httpError.status).json({ error: httpError.message })
    }
  }

  async login (
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const prismaUserRepository = new PrismaUserRepository()
    const loginUserService = new LoginUserService(prismaUserRepository)

    const { email, password } = request.body

    try {
      const user = await loginUserService.execute({
        email,
        password
      })

      return response.status(200).json(user)
    } catch (error) {
      const httpError: NotFoundError = error as NotFoundError

      return response.status(httpError.status).json({ error: httpError.message })
    }
  }

  async findById (
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const prismaUserRepository = new PrismaUserRepository()
    const findUserByIdService = new FindUserByIDService(prismaUserRepository)

    const { id } = request.params

    try {
      const user = await findUserByIdService.execute(id)

      return response.status(200).json(user)
    } catch (error) {
      const httpError: NotFoundError = error as NotFoundError

      return response.status(httpError.status).json({ error: httpError.message })
    }
  }
}

export { UserController }
