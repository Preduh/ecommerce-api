import { Router } from 'express'
import { userRouter } from '../domain/user/userRoutes'

const router = Router()

router.use('/user', userRouter)

export { router }
