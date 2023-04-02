const User = require("../../models/user");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../../helpers/jwt");
// const user = require("../../models/user");

const Register = async (req, res) => {
  const input = req.body;

  try {
    const isExist = await User.exists({ email: input.email });
    if (isExist) {
      throw new Error(
        "Daha önce bu email ile oluşturulan bir hesap bulunuyor."
      );
    }

    const registeredUser = await User.create(input);
    // console.log(registeredUser);

    const accessToken = signAccessToken({ user_id: registeredUser._id });
    const refreshToken = signRefreshToken({ user_id: registeredUser._id });

    res.json({
      user: registeredUser,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const Login = async (req, res) => {
  const input = req.body;

  try {
    // const findUser = await User.findOne({email: input.email, password: input.password}).select("-password");
    const findUser = await User.findOne({ email: input.email });

    if (!findUser) {
      throw new Error("Hatalı email.");
    }

    if (findUser.password !== input.password) {
      throw new Error("Hatalı şifre");
    }

    const accessToken = signAccessToken({ user_id: findUser._id });
    const refreshToken = signRefreshToken({ user_id: findUser._id });

    // const userData = findUser.toObject();
    // delete userData.password;
    // delete userData.__v;

    return res.json({
      user: findUser,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const RefreshToken = async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) {
    console.log("There is no refresh token");
    return res.sendStatus(400);
  }

  try {
    const user_id = await verifyRefreshToken(refresh_token);
    const user = await User.findById(user_id);
    const accessToken = signAccessToken({ user_id });
    const refreshToken = signRefreshToken({ user_id });
    res.json({ user, accessToken, refreshToken });
  } catch (err) {
    res.send(err);
  }
};

const Me = async (req, res) => {
  const { user_id } = req.payload;
  try {
    const user = await User.findById(user_id);
    // console.log(user);
    res.json(user);
  } catch (err) {
    res.send(err.message);
  }
};

const Logout = (req, res) => {
  // const { refresh_token } = req.body;
  res.json({ message: "success" });
};

module.exports = { Register, Login, Me, Logout, RefreshToken };
