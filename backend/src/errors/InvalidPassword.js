const AppError = require("./AppError");

class InvalidPassword extends AppError {
  statusCode = 400;
  constructor(message) {
    super(message);
  }
}

module.exports = InvalidPassword;
