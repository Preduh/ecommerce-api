import { NotFoundError } from '../../infra/errors/notFoundError'
import {
  type Product,
  type ProductRepository
} from './repositories/ProductRepository'

class FindAllProductService {
  constructor (private readonly productRepository: ProductRepository) {}

  async execute (): Promise<Product[]> {
    const findProducts = await this.productRepository.findAllProducts()

    if (findProducts.length === 0) {
      throw new NotFoundError('No product was found')
    }

    return findProducts
  }
}

export { FindAllProductService }
