export class LateCheckInValidationError extends Error {
  constructor() {
    super('The checkin can only be validated until 20 minutes of its creation')
    this.name = 'LateCheckInValidationError' // codeium
  }
}
