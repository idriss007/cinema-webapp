const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth");
const { verifyAccessToken } = require("../helpers/jwt");

router.post("/register", auth.Register);
router.post("/login", auth.Login);
router.get("/me", verifyAccessToken, auth.Me);
router.post("/logout", auth.Logout);
router.post("/refresh_token", auth.RefreshToken);

module.exports = router;
