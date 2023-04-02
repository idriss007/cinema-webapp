const express = require("express");

const rating = require("../controllers/rating");

const router = express.Router();

// router.post("/:user_id/:list_id:/movie_id", rating.AddRating);
router.post("/", rating.CreateRatingList);
router.post("/add", rating.AddRating);
router.post("/delete", rating.DeleteRating);
router.get("/:user_id/:movie_id", rating.GetRating);

module.exports = router;
