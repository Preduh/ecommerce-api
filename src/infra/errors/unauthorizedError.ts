import { HttpError } from './httpError'

class UnauthorizedError extends HttpError {
  constructor (message: string) {
    super(message)

    this.message = message
    this.name = 'Unauthorized'
    this.status = 404
  }
}

export { UnauthorizedError }
