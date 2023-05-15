const express = require("express");
const router = express.Router();

//Controller
const {
  GetUser,
  ChangeName,
  ChangeEmail,
  ChangePassword,
} = require("../controllers/user");
const { verifyAccessToken } = require("../helpers/jwt");

router.get("/:user_id", GetUser);

router.use(verifyAccessToken);

router.post("/change-name", ChangeName);
router.post("/change-email", ChangeEmail);
router.post("/change-password", ChangePassword);

module.exports = router;
