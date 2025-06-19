const express = require("express");
const router = express.Router();
const { index, show, store } = require("../controllers/moviesController");

// index
router.get("/", index);

// show
router.get("/:id", show);

// store
router.post("/:id/reviews", store);

module.exports = router;
