const bcrypt = require("bcrypt");

//Utils
const { tryCatch } = require("../../utils/tryCatch");

//Models
const User = require("../../models/user");

//Errors
const AppError = require("../../errors/AppError");
const BadRequestError = require("../../errors/BadRequestError");
const UnAuthenticatedError = require("../../errors/BadRequestError");

const {
  validateNewName,
  validateNewEmail,
  validateNewPassword,
} = require("./validations");

const GetUser = tryCatch(async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    throw new BadRequestError("Wrong or missing data.");
  }

  const foundUser = await User.findById(user_id);
  res.send(foundUser);
});

const ChangeName = tryCatch(async (req, res) => {
  const { error, value } = validateNewName(req.body);
  const { user_id } = req.payload;

  if (error) {
    throw error;
  }

  const foundUser = await User.findById(user_id);

  if (req.payload.user_id !== foundUser._id.toString()) {
    throw new UnAuthenticatedError("User not authenticated!");
  }

  if (
    !(foundUser && (await bcrypt.compare(value.password, foundUser.password)))
  ) {
    throw new BadRequestError("Incorrect password!");
  }

  foundUser.name = value.new_name;
  const updatedUser = await foundUser.save();
  res.send(updatedUser);
});

const ChangeEmail = tryCatch(async (req, res) => {
  const { error, value } = validateNewEmail(req.body);
  const { user_id } = req.payload;

  if (error) {
    throw error;
  }

  console.log(value.new_email, value.password);

  const foundUser = await User.findById(user_id);

  if (req.payload.user_id !== foundUser._id.toString()) {
    throw new UnAuthenticatedError("User not authenticated!");
  }

  if (
    !(foundUser && (await bcrypt.compare(value.password, foundUser.password)))
  ) {
    throw new BadRequestError("Incorrect password!");
  }

  const isEmailInUse = await User.find({ email: value.new_email });
  if (isEmailInUse.length > 0) {
    console.log(isEmailInUse);
    throw new BadRequestError("Email already using by someone else.");
  }

  foundUser.email = value.new_email;
  const updatedUser = await foundUser.save();
  res.send(updatedUser);
});

const ChangePassword = tryCatch(async (req, res) => {
  const { error, value } = validateNewPassword(req.body);
  const { user_id } = req.payload;

  if (error) {
    throw error;
  }

  console.log(value.current_password, value.new_password);

  const foundUser = await User.findById(user_id);

  console.log(foundUser);

  if (!foundUser) {
    throw new AppError("No user found!", 404);
  }

  if (req.payload.user_id !== foundUser._id.toString()) {
    throw new UnAuthenticatedError("User not authenticated!");
  }

  if (!(await bcrypt.compare(value.current_password, foundUser.password))) {
    throw new BadRequestError("Incorrect password!");
  }

  if (await bcrypt.compare(value.new_password, foundUser.password)) {
    throw new BadRequestError("Please choose a different password.");
  }

  const encryptedPassword = await bcrypt.hash(value.new_password, 10);
  foundUser.password = encryptedPassword;
  const updatedUser = await foundUser.save();
  res.send(updatedUser);
});

module.exports = { GetUser, ChangeName, ChangeEmail, ChangePassword };
