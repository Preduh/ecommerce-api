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
userRouter.put('/editUser', authMiddleware.validateToken, new UserController().update)
userRouter.put('/blockUser/:id', authMiddleware.validateToken, authMiddleware.isAdmin, new UserController().block)
userRouter.put('/unblockUser/:id', authMiddleware.validateToken, authMiddleware.isAdmin, new UserController().unblock)

export { userRouter }
