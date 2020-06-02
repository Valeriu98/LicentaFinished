const express = require("express");
const bodyParser = require("body-parser");

const DivTeamController = require("../controllers/div-team");
const router = express.Router();

router.get("/div-teams", DivTeamController.getDivTeams);

router.post("/div-team", DivTeamController.postDT);

router.put("/div-team/:id", DivTeamController.putDT);

router.delete("/div-team/:id", DivTeamController.deleteDT);

module.exports = router;
