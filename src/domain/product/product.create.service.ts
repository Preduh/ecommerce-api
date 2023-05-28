import { AlreadyExistsError } from '../../infra/errors/alreadyExistsError'
import { MissingParamError } from '../../infra/errors/missingParamError'
import {
  type CreateProductDTO,
  type Product,
  type ProductRepository
} from './repositories/ProductRepository'

type ProductDTOKeys =
  | 'title'
  | 'slug'
  | 'description'
  | 'price'
  | 'quantity'
  | 'color'
  | 'brand'
  | 'sold'

class CreateProductService {
  constructor (private readonly productRepository: ProductRepository) {}

  async execute (productDTO: CreateProductDTO): Promise<Product> {
    Object.keys(productDTO).forEach((key) => {
      const userDTOKeys = key as ProductDTOKeys

      if (
        productDTO[userDTOKeys] === undefined ||
        productDTO[userDTOKeys] === ''
      ) {
        throw new MissingParamError(`Missing param: ${key}`)
      }
    })

    const { title, slug, description, price, quantity, color, brand, sold } =
      productDTO

    const findProductSlug = await this.productRepository.findProductBySlug(slug)

    if (findProductSlug !== null) {
      throw new AlreadyExistsError('This slug already exists')
    }

    const product = await this.productRepository.createProduct({
      title,
      slug,
      description,
      price,
      quantity,
      color,
      brand,
      sold
    })

    return product
  }
}

export { CreateProductService }
