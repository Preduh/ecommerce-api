import { HttpError } from './httpError'

class InvalidParamsError extends HttpError {
  constructor (message: string) {
    super(message)

    this.message = message
    this.name = 'InvalidParams'
    this.status = 400
  }
}

export { InvalidParamsError }
