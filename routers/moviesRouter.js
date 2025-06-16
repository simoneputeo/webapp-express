const express = require("express");
const router = express.Router();
const { index, show } = require("../controllers/moviesController");

// index
router.get("/", index);

// show
router.get("/:id", show);

module.exports = router;
