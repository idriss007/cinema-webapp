const AppError = require("./AppError");

class BadRequestError extends AppError {
  statusCode = 400;
  constructor(message) {
    super(message);
  }
}

module.exports = BadRequestError;
