import { Router } from 'express'
import { UserController } from './user.controller'
import { AuthMiddleware } from '../../middlewares/auth.middleware'

const userRouter = Router()

const authMiddleware = new AuthMiddleware()

userRouter.post('/create', new UserController().create)
userRouter.get('/findAll', new UserController().findAll)
userRouter.post('/login', new UserController().login)
userRouter.get('/:id', authMiddleware.validateToken, authMiddleware.isAdmin, new UserController().findById)
userRouter.delete('/:id', new UserController().delete)
userRouter.put('/:id', new UserController().update)

export { userRouter }
