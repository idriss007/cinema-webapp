const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../helpers/jwt");
const { verifyUser } = require("../middlewares/verifyUser");

const comment = require("../controllers/comment");

router.get("/:movie_id", comment.GetAllComments);
router.get("/user/:user_id", comment.GetUserComments);

//Kullanıcı access token'i doğrulandıktan sonra aşağıdaki endpointleri kullanabilir.
router.use(verifyAccessToken);
router.use(verifyUser);

router.post("/", comment.CreateComment);
router.delete("/", comment.DeleteComment);
router.put("/", comment.UpdateComment);

module.exports = router;
