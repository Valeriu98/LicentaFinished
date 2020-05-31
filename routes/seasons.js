const express = require("express");
const bodyParser = require("body-parser");

const seasonController = require("../controllers/season");

const router = express.Router();

router.get("/seasons", seasonController.getSeason);

router.post("/season", seasonController.postSeason);

router.put("/season/:id", seasonController.putSeason);

router.delete("/season/:id", seasonController.deleteSeason);

module.exports = router;
