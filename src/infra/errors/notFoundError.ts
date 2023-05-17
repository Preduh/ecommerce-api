import { HttpError } from './httpError'

class NotFoundError extends HttpError {
  constructor (message: string) {
    super(message)

    this.message = message
    this.name = 'NotFoundError'
    this.status = 400
  }
}

export { NotFoundError }
