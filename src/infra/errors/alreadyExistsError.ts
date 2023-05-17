class AlreadyExistsError extends Error {
  public status: number

  constructor (message: string) {
    super(message)

    this.message = message
    this.name = 'AlreadyExists'
    this.status = 400
  }
}

export { AlreadyExistsError }
