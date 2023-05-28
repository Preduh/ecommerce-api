import { Router } from 'express'
import { ProductController } from './product.controller'

const productRouter = Router()

// Routes available to any product
productRouter.post('/create', new ProductController().create)

export { productRouter }
