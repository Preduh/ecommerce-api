import { Router } from 'express'
import { UserController } from './user.controller'
import { AuthMiddleware } from '../../middlewares/auth.middleware'

const userRouter = Router()

const authMiddleware = new AuthMiddleware()

// Routes available to any user
userRouter.post('/create', new UserController().create)
userRouter.get('/findAll', new UserController().findAll)
userRouter.post('/login', new UserController().login)
userRouter.delete('/:id', new UserController().delete)
userRouter.get('/refresh', new UserController().refreshToken)
userRouter.get('/logout', new UserController().logout)

// Routes available to logged users
userRouter.put('/editUser', authMiddleware.validateToken, new UserController().update)

// Routes available to admin logged users
userRouter.get('/:id', authMiddleware.validateToken, authMiddleware.isAdmin, new UserController().findById)
userRouter.put('/blockUser/:id', authMiddleware.validateToken, authMiddleware.isAdmin, new UserController().block)
userRouter.put('/unblockUser/:id', authMiddleware.validateToken, authMiddleware.isAdmin, new UserController().unblock)

export { userRouter }
