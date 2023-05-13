const express = require("express");
const router = express.Router();

//Controller
const { GetUser } = require("../controllers/user");

router.get("/:user_id", GetUser);

module.exports = router;
