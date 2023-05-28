import { Router } from 'express'
import { userRouter } from '../domain/user/userRoutes'
import { productRouter } from '../domain/product/productRoutes'

const router = Router()

router.use('/user', userRouter)
router.use('/product', productRouter)

export { router }
