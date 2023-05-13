const AppError = require("./AppError");

class UnAuthenticatedError extends AppError {
  statusCode = 401;
  constructor(message) {
    super(message);
  }
}

module.exports = UnAuthenticatedError;
