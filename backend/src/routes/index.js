const express = require("express");

const auth = require("./auth");
const list = require("./list");
const rating = require("./rating");

const router = express.Router();

router.use("/auth", auth);
router.use("/list", list);
router.use("/rating", rating);

module.exports = router;