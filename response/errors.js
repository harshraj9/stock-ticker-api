class ErrorResult extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}
exports.ErrorResult = ErrorResult;
class BadRequestResult extends ErrorResult {}
exports.BadRequestResult = BadRequestResult;
class InternalServerErrorResult extends ErrorResult {}
exports.InternalServerErrorResult = InternalServerErrorResult;
class NotFoundResult extends ErrorResult {}
exports.NotFoundResult = NotFoundResult;
