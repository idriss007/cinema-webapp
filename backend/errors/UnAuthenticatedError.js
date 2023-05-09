const AppError = require("./AppError");

class UnAuthenticatedError extends AppError {
  constructor(message) {
    const statusCode = 401;
    super(message, statusCode);
  }
}

module.exports = UnAuthenticatedError;
