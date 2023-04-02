const express = require("express");
const router = express.Router();

const comment = require("../controllers/comment");

router.post("/", comment.CreateComment);
router.delete("/", comment.DeleteComment);
router.put("/", comment.UpdateComment);
router.get("/:movie_id", comment.GetAllComments);
router.get("/user/:user_id", comment.GetUserComments);

module.exports = router;
