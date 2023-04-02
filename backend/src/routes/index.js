const express = require("express");

const auth = require("./auth");
const list = require("./list");
const rating = require("./rating");
const comment = require("./comment");

const router = express.Router();

router.use("/auth", auth);
router.use("/list", list);
router.use("/rating", rating);
router.use("/comment", comment);

module.exports = router;
