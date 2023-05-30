import slugify from 'slugify'
import { AlreadyExistsError } from '../../infra/errors/alreadyExistsError'
import { InvalidParamsError } from '../../infra/errors/invalidParamsError'
import { NotFoundError } from '../../infra/errors/notFoundError'
import {
  type ProductRepository,
  type Product
} from './repositories/ProductRepository'

interface UpdateProductDTO {
  id: string
  title?: string
  description?: string
  price?: number
  quantity?: number
  color?: string
  brand?: string
  sold?: number
}

class UpdateProductService {
  constructor (private readonly productRepository: ProductRepository) {}

  async execute ({
    id,
    brand,
    color,
    description,
    price,
    quantity,
    sold,
    title,
    ...otherProperties
  }: UpdateProductDTO): Promise<Product> {
    const invalidProperties = Object.keys(otherProperties)

    let invalidParams: string = ''

    invalidProperties.forEach((invalidProperty, idx) => {
      if (idx === 0) {
        invalidParams = invalidParams.concat(`'${invalidProperty}'`)
      } else {
        invalidParams = invalidParams.concat(`, '${invalidProperty}'`)
      }
    })

    if (invalidProperties.length > 0) {
      throw new InvalidParamsError(`Invalid params: ${invalidParams}`)
    }

    let slug = ''

    if (title !== undefined) {
      const findProductSlug = await this.productRepository.findProductBySlug(
        slug
      )

      slug = slugify(title, {
        lower: true,
        trim: true
      })

      if (findProductSlug !== null) {
        throw new AlreadyExistsError('This slug already exists')
      }
    }

    const updatedProduct = await this.productRepository.updateProduct({
      id,
      brand,
      color,
      description,
      price,
      quantity,
      slug,
      sold,
      title
    })

    if (updatedProduct === null) {
      throw new NotFoundError('Product not found')
    }

    return updatedProduct
  }
}

export { UpdateProductService }
