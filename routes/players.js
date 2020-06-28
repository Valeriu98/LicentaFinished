var express = require('express');

const playerController = require('../controllers/player');

const router = express.Router();

router.get('/players/', playerController.getPlayers);

router.get('/players/:id', playerController.getTeamPlayers);


router.get('/player/:id', playerController.getPlayer);

router.post('/player', playerController.postPlayer);

router.put('/player/:id', playerController.putPlayer);

router.delete('/player/:id', playerController.deletePlayer);

module.exports = router;
