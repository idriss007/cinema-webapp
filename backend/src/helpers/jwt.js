const jwt = require("jsonwebtoken");

function signAccessToken(data) {
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return accessToken;
}

function verifyAccessToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(400).send("Access token not found!");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.payload = payload;
    next();
  });
}

function signRefreshToken(data) {
  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
  return refreshToken;
}

function verifyRefreshToken(refresh_token) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          /* eslint-disable-next-line*/ /*Aşağıdaki res kullanımı yanlış. Res diye bir şey yok burada*/
          return reject(err);
        } else {
          const { user_id } = payload;
          return resolve(user_id);
        }
      }
    );
  });
}

module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};
