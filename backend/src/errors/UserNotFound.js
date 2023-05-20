const AppError = require("./AppError");

class UserNotFound extends AppError {
  statusCode = 404;
  constructor(message) {
    super(message);
  }
}

module.exports = UserNotFound;
