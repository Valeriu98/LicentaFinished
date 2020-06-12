const express = require('express');
const bodyParser = require('body-parser');

const teamController = require('../controllers/team');

const router = express.Router();

router.get('/teams', teamController.getTeam);

router.post('/team', teamController.postTeam);

router.put('/team/:id', teamController.putTeam);

router.delete('/team/:id', teamController.deleteTeam);

module.exports = router;
