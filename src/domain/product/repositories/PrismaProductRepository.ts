import { v4 as uuid } from 'uuid'
import { prismaClient } from '../../../database/prismaClient'
import {
  type CreateProductDTO,
  type Product,
  type ProductRepository
} from './ProductRepository'

export class PrismaProductRepository implements ProductRepository {
  async createProduct ({
    title,
    slug,
    description,
    price,
    quantity,
    color,
    brand,
    sold
  }: CreateProductDTO): Promise<Product> {
    const product = await prismaClient.product.create({
      data: {
        id: uuid(),
        title,
        slug,
        description,
        price,
        quantity,
        color,
        brand,
        sold
      }
    })

    return product
  }

  async findProductBySlug (slug: string): Promise<Product | null> {
    const product = await prismaClient.product.findFirst({
      where: {
        slug
      }
    })

    return product
  }

  async findProductById (id: string): Promise<Product | null> {
    const product = await prismaClient.product.findFirst({
      where: {
        id
      }
    })

    return product
  }
}
