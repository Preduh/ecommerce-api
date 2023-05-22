import { type Request, type Response } from 'express'
import { type HttpError } from '../../infra/errors/httpError'
import { PrismaUserRepository } from './repositories/PrismaUserRepository'
import { BlockUserService } from './user.block.service'
import { CreateUserService } from './user.create.service'
import { DeleteUserService } from './user.delete.service'
import { FindAllUserService } from './user.findall.service'
import { FindUserByIDService } from './user.findbyid.service'
import { LoginUserService } from './user.login.service'
import { RefreshTokenUserService } from './user.refreshToken.service'
import { UnblockUserService } from './user.unblock.service'
import { UpdateUserService } from './user.update.service'

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
        refreshToken: null,
        password
      })

      return response.status(201).json(user)
    } catch (error) {
      const httpError: HttpError = error as HttpError

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
      const httpError: HttpError = error as HttpError

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
      const { user, refreshToken, token } = await loginUserService.execute({
        email,
        password
      })

      response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000
      })

      return response.status(200).json({ user, token })
    } catch (error) {
      const httpError: HttpError = error as HttpError

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
      const httpError: HttpError = error as HttpError

      return response.status(httpError.status).json({ error: httpError.message })
    }
  }

  async delete (request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const prismaUserRepository = new PrismaUserRepository()
    const deleteUserService = new DeleteUserService(prismaUserRepository)

    const { id } = request.params

    try {
      const deletedUser = await deleteUserService.execute(id)

      return response.status(200).json(deletedUser)
    } catch (error) {
      const httpError: HttpError = error as HttpError

      return response.status(httpError.status).json({ error: httpError.message })
    }
  }

  async update (request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const prismaUserRepository = new PrismaUserRepository()
    const updateUserService = new UpdateUserService(prismaUserRepository)

    const { userId: id } = response.locals
    const { body } = request

    try {
      const updatedUser = await updateUserService.execute({ id, ...body })

      return response.status(200).json(updatedUser)
    } catch (error) {
      const httpError: HttpError = error as HttpError

      return response.status(httpError.status).json({ error: httpError.message })
    }
  }

  async block (request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const prismaUserRepository = new PrismaUserRepository()
    const blockUserService = new BlockUserService(prismaUserRepository)

    const { id } = request.params

    try {
      await blockUserService.execute(id)

      return response.status(200).json({ message: 'User blocked' })
    } catch (error) {
      const httpError: HttpError = error as HttpError

      return response.status(httpError.status).json({ error: httpError.message })
    }
  }

  async unblock (request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const prismaUserRepository = new PrismaUserRepository()
    const unblockUserService = new UnblockUserService(prismaUserRepository)

    const { id } = request.params

    try {
      await unblockUserService.execute(id)

      return response.status(200).json({ message: 'User unblocked' })
    } catch (error) {
      const httpError: HttpError = error as HttpError

      return response.status(httpError.status).json({ error: httpError.message })
    }
  }

  async refreshToken (request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const prismaUserRepository = new PrismaUserRepository()
    const refreshTokenUserService = new RefreshTokenUserService(prismaUserRepository)

    try {
      const { accessToken, refreshToken } = await refreshTokenUserService.execute(request.cookies.refreshToken)

      return response.status(200).json({ accessToken, refreshToken })
    } catch (error) {
      const httpError: HttpError = error as HttpError

      return response.status(httpError.status).json({ error: httpError.message })
    }
  }
}

export { UserController }
