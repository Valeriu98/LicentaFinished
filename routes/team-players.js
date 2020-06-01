const express = require("express");
const bodyParser = require("body-parser");

const TeamPlayerController = require("../controllers/team-player");
const router = express.Router();

router.get("/team-players", TeamPlayerController.getTeamPlayers);

module.exports = router;
