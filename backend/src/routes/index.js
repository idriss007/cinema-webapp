const express = require("express");

const auth = require("./auth");
const list = require("./list");
const rating = require("./rating");
const comment = require("./comment");
const user = require("./user");

const router = express.Router();

router.use("/auth", auth);
router.use("/lists", list);
router.use("/ratings", rating);
router.use("/comments", comment);
router.use("/users", user);

module.exports = router;
