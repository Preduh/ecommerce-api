import { HttpError } from './httpError'

class AlreadyExistsError extends HttpError {
  constructor (message: string) {
    super(message)

    this.message = message
    this.name = 'AlreadyExists'
    this.status = 400
  }
}

export { AlreadyExistsError }
