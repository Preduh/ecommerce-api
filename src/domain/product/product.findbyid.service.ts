import { NotFoundError } from '../../infra/errors/notFoundError'
import {
  type Product,
  type ProductRepository
} from './repositories/ProductRepository'

class FindProductByIDService {
  constructor (private readonly productRepository: ProductRepository) {}

  async execute (id: string): Promise<Product> {
    const findProduct = await this.productRepository.findProductById(id)

    if (findProduct === null) {
      throw new NotFoundError('Product not found')
    }

    return findProduct
  }
}

export { FindProductByIDService }
