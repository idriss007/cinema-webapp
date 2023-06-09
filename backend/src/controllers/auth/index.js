const bcrypt = require("bcrypt");

//Models
const User = require("../../models/user");

//Utils
const { tryCatch } = require("../../utils/tryCatch");

//Validation Methods
const { validateLogin, validateRegister } = require("./validations");

//Errors
const InvalidToken = require("../../errors/InvalidToken");
const UserNotFound = require("../../errors/UserNotFound");
const UserAlreadyExist = require("../../errors/UserAlreadyExist");

const ErrorMessage = require("../../utils/constants");

//Jwt Methods
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../../helpers/jwt");

const Register = tryCatch(async (req, res) => {
  const { error, value } = validateRegister(req.body);

  if (error) {
    throw error;
  }

  const isExist = await User.exists({ email: value.email });

  if (isExist) {
    throw new UserAlreadyExist(ErrorMessage.ALREADY_EXIST);
  }

  const encryptedPassword = await bcrypt.hash(value.password, 10);

  const registeredUser = await User.create({
    name: value.name,
    email: value.email.toLowerCase(),
    password: encryptedPassword,
  });

  const accessToken = signAccessToken({ user_id: registeredUser._id });
  const refreshToken = signRefreshToken({ user_id: registeredUser._id });

  res.json({
    user: registeredUser,
    accessToken,
    refreshToken,
  });
});

const Login = tryCatch(async (req, res) => {
  const { error, value } = validateLogin(req.body);

  if (error) {
    throw error;
  }

  // const findUser = await User.findOne({email: input.email, password: input.password}).select("-password");
  const findUser = await User.findOne({ email: value.email });

  if (
    !(findUser && (await bcrypt.compare(value.password, findUser.password)))
  ) {
    throw new UserNotFound(ErrorMessage.NOT_FOUND);
  }

  const userData = findUser.toObject();
  delete userData.password;
  delete userData.profile_image;

  const accessToken = signAccessToken({ user_id: findUser._id });
  const refreshToken = signRefreshToken({ user_id: findUser._id });

  return res.json({
    user: userData,
    accessToken,
    refreshToken,
  });
});

const RefreshToken = tryCatch(async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) {
    throw new InvalidToken(ErrorMessage.INVALID_TOKEN);
  }

  const user_id = await verifyRefreshToken(refresh_token);
  const user = await User.findById(user_id).select("-password -profile_image");
  const accessToken = signAccessToken({ user_id });
  const refreshToken = signRefreshToken({ user_id });
  res.json({ user, accessToken, refreshToken });
});

const Me = tryCatch(async (req, res) => {
  const { user_id } = req.payload;
  const user = await User.findById(user_id).select("-password -profile_image");
  res.json(user);
});

const Logout = (req, res) => {
  // const { refresh_token } = req.body;
  res.json({ message: "success" });
};

module.exports = { Register, Login, Me, Logout, RefreshToken };
