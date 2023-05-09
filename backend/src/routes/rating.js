const express = require("express");

const rating = require("../controllers/rating");
const { verifyAccessToken } = require("../helpers/jwt");

const router = express.Router();

router.get("/:user_id/:movie_id", rating.GetRating);
// router.post("/:user_id/:list_id:/movie_id", rating.AddRating);

router.use(verifyAccessToken);

router.post("/", rating.CreateRatingList);
router.post("/add", rating.AddRating);
router.post("/delete", rating.DeleteRating);

module.exports = router;
