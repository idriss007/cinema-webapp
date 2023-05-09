const User = require("../../models/user");
const bcrypt = require("bcrypt");
const { tryCatch } = require("../../utils/tryCatch");

//Validation Methods
const { validateLogin, validateRegister } = require("./validations");

//Base Error Class
const AppError = require("../../../errors/AppError");

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
    throw new AppError("User already exist.", 404);
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
    throw new AppError("No user found!", 404);
  }

  const accessToken = signAccessToken({ user_id: findUser._id });
  const refreshToken = signRefreshToken({ user_id: findUser._id });

  return res.json({
    user: findUser,
    accessToken,
    refreshToken,
  });
});

const RefreshToken = tryCatch(async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) {
    throw new AppError("There is no refresh token", 400);
  }

  const user_id = await verifyRefreshToken(refresh_token);
  const user = await User.findById(user_id);
  const accessToken = signAccessToken({ user_id });
  const refreshToken = signRefreshToken({ user_id });
  res.json({ user, accessToken, refreshToken });
});

const Me = tryCatch(async (req, res) => {
  const { user_id } = req.payload;
  const user = await User.findById(user_id);
  res.json(user);
});

const Logout = (req, res) => {
  // const { refresh_token } = req.body;
  res.json({ message: "success" });
};

module.exports = { Register, Login, Me, Logout, RefreshToken };
