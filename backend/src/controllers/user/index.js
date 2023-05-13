//Utils
const { tryCatch } = require("../../utils/tryCatch");

//Models
const User = require("../../models/user");

//Errors
const BadRequestError = require("../../errors/BadRequestError");

const GetUser = tryCatch(async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    throw new BadRequestError("Wrong or missing data.");
  }

  const foundUser = await User.findById(user_id);
  res.send(foundUser);
});

module.exports = { GetUser };
