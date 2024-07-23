class Response {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
class ErrorResponse extends Response {
  constructor(message) {
    super(false, message)
  }
}
class SuccesResponse extends Response {
  constructor(message, data) {
    super(true, message, data)
  }
}
module.exports = { Response, ErrorResponse, SuccesResponse }