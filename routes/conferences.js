const express = require("express");
const bodyParser = require("body-parser");

const conferenceController = require("../controllers/conference");

const router = express.Router();

router.get("/conferences", conferenceController.getConf);

router.put("/conference/:id", conferenceController.putConf);
router.delete("/conference/:id", conferenceController.deleteConf);

router.post("/conference/", conferenceController.postConf);

module.exports = router;
