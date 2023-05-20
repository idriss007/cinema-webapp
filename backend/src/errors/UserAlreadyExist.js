const AppError = require("./AppError");

class UserAlreadyExist extends AppError {
  statusCode = 400;
  constructor(message) {
    super(message);
  }
}

module.exports = UserAlreadyExist;
