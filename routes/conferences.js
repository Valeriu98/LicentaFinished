const express = require("express");
const bodyParser = require("body-parser");

const conferenceController = require("../controllers/conference");

const router = express.Router();

router.get("/conferences", conferenceController.getConf);

module.exports = router;
