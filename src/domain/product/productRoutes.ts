import { Router } from 'express'
import { ProductController } from './product.controller'
import { AuthMiddleware } from '../../middlewares/auth.middleware'

const productRouter = Router()

const authMiddleware = new AuthMiddleware()

// Routes available to any user
productRouter.get('/findAll', new ProductController().findAll)
productRouter.get('/:id', new ProductController().findById)

// Routes available to admin logged users
productRouter.post('/create', authMiddleware.validateToken, authMiddleware.isAdmin, new ProductController().create)
productRouter.put('/editProduct/:id', authMiddleware.validateToken, authMiddleware.isAdmin, new ProductController().update)
export { productRouter }
