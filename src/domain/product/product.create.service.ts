import { AlreadyExistsError } from '../../infra/errors/alreadyExistsError'
import { MissingParamError } from '../../infra/errors/missingParamError'
import {
  type Product,
  type ProductRepository
} from './repositories/ProductRepository'
import slugify from 'slugify'

interface CreateProductDTO {
  title: string
  description: string
  price: number
  quantity: number
  color: string
  brand: string
  sold: number
}

type ProductDTOKeys =
  | 'title'
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
      const productDTOKeys = key as ProductDTOKeys

      if (
        productDTO[productDTOKeys] === undefined ||
        productDTO[productDTOKeys] === ''
      ) {
        throw new MissingParamError(`Missing param: ${key}`)
      }
    })

    const { title, description, price, quantity, color, brand, sold } =
      productDTO

    const slug = slugify(title, {
      lower: true,
      trim: true
    })

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
