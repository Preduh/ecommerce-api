import { NotFoundError } from '../../infra/errors/notFoundError'
import { type Product, type ProductRepository } from './repositories/ProductRepository'

class FindProductBySlugService {
  constructor (private readonly productRepository: ProductRepository) {}

  async execute (slug: string): Promise<Product> {
    const findSlug = await this.productRepository.findProductBySlug(slug)

    if (findSlug === null) {
      throw new NotFoundError('Product not found')
    }

    return findSlug
  }
}

export { FindProductBySlugService }
