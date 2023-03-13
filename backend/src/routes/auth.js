const express = require("express");
const auth = require("../controllers/auth");

const router = express.Router();

router.post("/register", auth.Register);
router.post("/login", auth.Login);

module.exports = router;