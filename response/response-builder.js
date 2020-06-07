const errors = require('./errors');
const http_status_codes = require('./http-status-codes');

class ResponseBuilder {
  static badRequest(message) {
    const errorResult = new errors.BadRequestResult(http_status_codes.BadRequest, message);
    return errorResult;
  }
  static internalServerError(message) {
    const errorResult = new errors.InternalServerErrorResult(
      http_status_codes.InternalServerError,
      message
    );
    return errorResult;
  }
  static notFound(message) {
    const errorResult = new errors.NotFoundResult(http_status_codes.NotFound, message);
    return errorResult;
  }
  static ok(result) {
    return result;
  }

  buildResponse(response) {
    if (response.status === http_status_codes.BadRequest) {
      return ResponseBuilder.badRequest(response.message ? response.message : '');
    } else if (response.status === http_status_codes.NotFound) {
      return ResponseBuilder.notFound(response.message ? response.message : '');
    } else if (response.status === http_status_codes.InternalServerError) {
      return ResponseBuilder.internalServerError(response.message ? response.message : '');
    } else {
      return ResponseBuilder.ok(response);
    }
  }
}
module.exports = ResponseBuilder;
