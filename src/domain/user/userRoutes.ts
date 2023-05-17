import { Router } from 'express'
import { UserController } from './user.controller'

const userRouter = Router()

userRouter.post('/create', new UserController().create)
userRouter.get('/findAll', new UserController().findAll)
userRouter.post('/login', new UserController().login)
userRouter.get('/:id', new UserController().findById)

export { userRouter }
