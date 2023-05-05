function verifyUser(req, res, next) {
  const { user_id } = req.body;
  const { payload } = req;

  if (!(payload.user_id === user_id)) {
    return res.sendStatus(400);
  }
  next();
}

module.exports = { verifyUser };
