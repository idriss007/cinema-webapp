const AppError = require("./AppError");

class InvalidToken extends AppError {
  statusCode = 401;
  constructor(message) {
    super(message);
  }
}

module.exports = InvalidToken;
