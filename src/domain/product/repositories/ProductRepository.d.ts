export interface Product {
  id: string
  title: string
  slug: string
  description: string
  price: number
  quantity: number
  color: string
  brand: string
  sold: number
  createdAt: Date
  updatedAt: Date
}

export interface CreateProductDTO {
  title: string
  slug: string
  description: string
  price: number
  quantity: number
  color: string
  brand: string
  sold: number
}

export interface ProductRepository {
  createProduct: (product: CreateProductDTO) => Promise<Product>
  findProductBySlug: (slug: string) => Promise<Product | null>
  findProductById: (id: string) => Promise<Product | null>
  findAllProducts: () => Promise<Product[]>
}
