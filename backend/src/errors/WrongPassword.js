const AppError = require("./AppError");

class WrongPassword extends AppError {
  statusCode = 400;
  constructor(message) {
    super(message);
  }
}

module.exports = WrongPassword;
