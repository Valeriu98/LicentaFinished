const express = require("express");
const bodyParser = require("body-parser");

const gameController = require("../controllers/game");

const router = express.Router()

router.get("/games", gameController.getGames)

router.post("/game", gameController.postGame)

router.put("/game/:id", gameController.putGame)

router.delete("/game/:id", gameController.deleteGame)

module.exports = router;
