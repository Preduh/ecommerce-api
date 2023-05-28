import { Router } from 'express'
import { ProductController } from './product.controller'

const productRouter = Router()

// Routes available to any user
productRouter.post('/create', new ProductController().create)
productRouter.get('/:id', new ProductController().findById)

export { productRouter }
