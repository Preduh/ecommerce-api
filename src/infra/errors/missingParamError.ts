import { HttpError } from './httpError'

class MissingParamError extends HttpError {
  constructor (message: string) {
    super(message)

    this.message = message
    this.name = 'RequiredParam'
    this.status = 400
  }
}

export { MissingParamError }
