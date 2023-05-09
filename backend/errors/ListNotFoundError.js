const AppError = require("./AppError");

class ListNotFoundError extends AppError {
  constructor(message) {
    const statusCode = 404;
    super(message, statusCode);
  }
}

module.exports = ListNotFoundError;
