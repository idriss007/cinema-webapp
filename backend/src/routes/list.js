const express = require("express");
const router = express.Router();

const list = require("../controllers/list");



router.post("/", list.CreateList);
router.get("/:user_id", list.GetLists);
router.get("/add/:list_id/:movie_id", list.AddToList);
router.get("/delete/:list_id/:movie_id", list.RemoveFromList)

module.exports = router;