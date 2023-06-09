const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Joi = require("joi");

//Utils
const { tryCatch } = require("../../utils/tryCatch");
const sendEmail = require("../../utils/sendEmail");

//Models
const User = require("../../models/user");
const Token = require("../../models/token");

//Errors
const UserNotFound = require("../../errors/UserNotFound");
const BadRequestError = require("../../errors/BadRequestError");
const UnAuthenticatedError = require("../../errors/BadRequestError");

const ErrorMessage = require("../../utils/constants");

const {
  validateNewName,
  validateNewEmail,
  validateNewPassword,
  validateResetPassord,
} = require("./validations");

const GetUser = tryCatch(async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    throw new BadRequestError(ErrorMessage.BAD_REQUEST);
  }

  const foundUser = await User.findById(user_id).select("-password");
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
    throw new UnAuthenticatedError(ErrorMessage.UNAUTHENTICATED);
  }

  if (
    !(foundUser && (await bcrypt.compare(value.password, foundUser.password)))
  ) {
    throw new BadRequestError(ErrorMessage.BAD_REQUEST);
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

  const foundUser = await User.findById(user_id);

  if (req.payload.user_id !== foundUser._id.toString()) {
    throw new UnAuthenticatedError(ErrorMessage.UNAUTHENTICATED);
  }

  if (
    !(foundUser && (await bcrypt.compare(value.password, foundUser.password)))
  ) {
    throw new BadRequestError(ErrorMessage.BAD_REQUEST);
  }

  const isEmailInUse = await User.find({ email: value.new_email });
  if (isEmailInUse.length > 0) {
    throw new BadRequestError(ErrorMessage.BAD_REQUEST);
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

  const foundUser = await User.findById(user_id);

  if (!foundUser) {
    throw new UserNotFound(ErrorMessage.NOT_FOUND);
  }

  if (req.payload.user_id !== foundUser._id.toString()) {
    throw new UnAuthenticatedError(ErrorMessage.UNAUTHENTICATED);
  }

  if (!(await bcrypt.compare(value.current_password, foundUser.password))) {
    throw new BadRequestError(ErrorMessage.WRONG_PASSWORD);
  }

  if (await bcrypt.compare(value.new_password, foundUser.password)) {
    throw new BadRequestError(ErrorMessage.INVALID_PASSWORD);
  }

  const encryptedPassword = await bcrypt.hash(value.new_password, 10);
  foundUser.password = encryptedPassword;
  const updatedUser = await foundUser.save();
  res.send(updatedUser);
});

const ChangeProfileImage = tryCatch(async (req, res) => {
  const { profile_image } = req.body;
  const { user_id } = req.payload;

  const foundUser = await User.findById(user_id);

  if (req.payload.user_id !== foundUser._id.toString()) {
    throw new UnAuthenticatedError(ErrorMessage.UNAUTHENTICATED);
  }

  foundUser.profile_image = profile_image;
  const updatedUser = await foundUser.save();
  res.send(updatedUser);
});

const SendResetPasswordLink = tryCatch(async (req, res) => {
  const { error, value } = validateResetPassord(req.body);

  if (error) {
    throw error;
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new UserNotFound(ErrorMessage.NOT_FOUND);
  }

  let token = await Token.findOne({ user_id: user._id });
  if (!token) {
    token = await Token.create({
      user_id: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
  }

  const link = `${process.env.BASE_URL}/reset-password/${user._id}/${token.token}`;
  await sendEmail(user.email, "password reset", link);

  res.send("password reset link sent to your email account.");
});

const ResetPassword = tryCatch(async (req, res) => {
  const schema = Joi.object({
    password: Joi.string().trim().min(5).required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    throw error;
  }

  const user = await User.findById(req.params.user_id);
  if (!user) {
    throw new BadRequestError(ErrorMessage.BAD_REQUEST);
  }

  const token = await Token.findOne({
    user_id: user._id,
    token: req.params.token,
  });

  if (!token) {
    throw new BadRequestError(ErrorMessage.BAD_REQUEST);
  }

  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  user.password = encryptedPassword;
  await user.save();

  await Token.findByIdAndDelete(token);

  res.send("password reset successfully.");
});

module.exports = {
  GetUser,
  ChangeName,
  ChangeEmail,
  ChangePassword,
  ChangeProfileImage,
  SendResetPasswordLink,
  ResetPassword,
};
