const express = require("express");
const bodyParser = require("body-parser");

const pointsController = require("../controllers/points");

const router = express.Router()

router.get("/points", pointsController.getPoints)

router.post('/point', pointsController.postPoint)

module.exports = router;
