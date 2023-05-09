const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../helpers/jwt");

const list = require("../controllers/list");

router.get("/list/:list_id", list.GetList);
router.get("/:user_id", list.GetLists);

router.use(verifyAccessToken);

router.post("/", list.CreateList);
router.delete("/", list.DeleteList);
router.post("/add/:list_id/:movie_id", list.AddToList);
router.post("/delete/:list_id/:movie_id", list.RemoveFromList);

// router.post("/", list.CreateList);
// router.delete("/", list.DeleteList);
// router.get("/:user_id", list.GetLists);
// router.get("/:user_id/:list_id", list.GetList);
// router.post("/:list_id/:movie_id", list.AddToList);
// router.delete("/:list_id/:movie_id", list.RemoveFromList);

module.exports = router;
