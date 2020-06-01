const express = require("express");
const bodyParser = require("body-parser");

const TeamPlayerController = require("../controllers/team-player");
const router = express.Router();

router.get("/team-players", TeamPlayerController.getTeamPlayers);

router.post("/team-player", TeamPlayerController.postTP);

router.put("/team-player/:id", TeamPlayerController.putTP);

router.delete("/team-player/:id", TeamPlayerController.deleteTP);

module.exports = router;
