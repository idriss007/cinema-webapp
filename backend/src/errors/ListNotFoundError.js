const AppError = require("./AppError");

class ListNotFoundError extends AppError {
  statusCode = 404;
  constructor(message) {
    super(message);
  }
}

module.exports = ListNotFoundError;
