const express = require("express");

const rating = require("../controllers/rating");
const { verifyAccessToken } = require("../helpers/jwt");

const router = express.Router();

router.get("/users/:user_id/:movie_id", rating.GetRating);

router.use(verifyAccessToken);

router.post("/", rating.CreateRatingList);
router.put("/", rating.AddRating);
router.delete("/", rating.DeleteRating);

module.exports = router;
