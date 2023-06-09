import { HttpError } from './httpError'

class NotFoundError extends HttpError {
  constructor (message: string) {
    super(message)

    this.message = message
    this.name = 'NotFound'
    this.status = 404
  }
}

export { NotFoundError }
