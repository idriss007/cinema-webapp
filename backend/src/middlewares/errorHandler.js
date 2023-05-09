const AppError = require("../../errors/AppError");

function errorHandler(error, req, res, next) {
  if (error.name === "ValidationError") {
    // return res.status(400).send({
    //   type: "ValidationError",
    //   details: error.details,
    // });

    // return res.status(400).send(error.details.map((error) => error.message));
    return res.status(400).send(error.message);
  }
  if (error instanceof AppError) {
    console.log(error);
    return res.status(error.statusCode).send(error.message);
  }

  return res.status(500).send("Something went wrong");
}

module.exports = errorHandler;
