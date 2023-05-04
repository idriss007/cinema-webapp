const express = require("express");
const router = express.Router();

const list = require("../controllers/list");

router.post("/", list.CreateList);
router.delete("/", list.DeleteList);
router.get("/list/:list_id", list.GetList);
router.get("/:user_id", list.GetLists);
router.post("/add/:list_id/:movie_id", list.AddToList);
router.post("/delete/:list_id/:movie_id", list.RemoveFromList);

module.exports = router;
