import { type Request, type Response } from 'express'
import { type HttpError } from '../../infra/errors/httpError'
import { PrismaProductRepository } from './repositories/PrismaProductRepository'
import { CreateProductService } from './product.create.service'
import { FindProductByIDService } from './product.findbyid.service'

class ProductController {
  async create (
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const prismaProductRepository = new PrismaProductRepository()
    const createProductService = new CreateProductService(
      prismaProductRepository
    )

    const { title, slug, description, price, quantity, color, brand, sold } =
      request.body

    try {
      const product = await createProductService.execute({
        title,
        slug,
        description,
        price,
        quantity,
        color,
        brand,
        sold
      })

      return response.status(201).json(product)
    } catch (error) {
      const httpError: HttpError = error as HttpError

      return response
        .status(httpError.status)
        .json({ error: httpError.message })
    }
  }

  async findById (
    request: Request,
    response: Response
  ): Promise<Response<any, Record<string, any>>> {
    const prismaProductRepository = new PrismaProductRepository()
    const findProductByIdService = new FindProductByIDService(
      prismaProductRepository
    )

    const { id } = request.params

    try {
      const product = await findProductByIdService.execute(id)

      return response.status(200).json(product)
    } catch (error) {
      const httpError: HttpError = error as HttpError

      return response
        .status(httpError.status)
        .json({ error: httpError.message })
    }
  }
}

export { ProductController }
