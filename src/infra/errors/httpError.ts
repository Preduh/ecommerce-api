class HttpError extends Error {
  public status: number

  constructor (message: string) {
    super(message)

    this.message = message
    this.status = 400
  }
}

export { HttpError }
