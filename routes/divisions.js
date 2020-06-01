const express = require("express");
const bodyParser = require("body-parser");

const divisionController = require("../controllers/division");

const router = express.Router();

router.get("/divisions", divisionController.getDiv);

router.post("/division", divisionController.postDiv);

router.put("/division/:id", divisionController.putDiv);

router.delete("/division/:id", divisionController.deleteDiv);

module.exports = router;
