const express = require('express');
const bodyParser = require('body-parser');

// var router = express.Router();
const Player = require('../models/player');

// GET PLAYERS
exports.getPlayers = (req, res, next) => {
	Player.findAll()
		.then((player) => {
			res.json(player);
		})
		.catch((err) => {
			res.send('error is' + err);
		});
};

//GET PLAYER
// GET PLAYERS
exports.getPlayer = (req, res, next) => {
	let Id_player = req.params.id;
	Player.findByPk(Id_player)
		.then((player) => {
			res.json(player);
		})
		.catch((err) => {
			res.send('error in retrieving single player is' + err);
		});
};

//ADD PLAYERS
exports.postPlayer = (req, res, next) => {
	if (
		!req.body.F_name &&
		!req.body.L_name &&
		!req.body.Born &&
		!req.body.College &&
		!req.body.Nba_debut &&
		!req.body.Height &&
		!req.body.Position &&
		!req.body.PlayerImage
	) {
		res.status(400).json({ error: 'Bad data' });
	} else {
		Player.create(req.body)
			.then(() => {
				res.send('Player added');
			})
			.catch((err) => {
				res.send('error ' + err);
			});
	}
};

//DELETE player
// router.delete("/player/:id", (req, res, next) => {
exports.deletePlayer = (req, res, next) => {
	Player.destroy({
		where: {
			Id_player: req.params.id,
		},
	})
		.then(() => {
			res.send('Player Deleted');
		})
		.catch((err) => {
			res.send('error' + err);
		});
};

// //UPDATE player
// router.put("/player/:id", (req, res, next) => {
exports.putPlayer = (req, res, next) => {
	if (
		!req.body.F_name &&
		!req.body.L_name &&
		!req.body.Born &&
		!req.body.College &&
		!req.body.Nba_debut &&
		!req.body.Height &&
		!req.body.Position
	) {
		res.status(400).json({ error: 'Bad data' });
	} else {
		Player.update(
			{
				F_name: req.body.F_name,
				L_name: req.body.L_name,
				Born: req.body.Born,
				College: req.body.College,
				Nba_debut: req.body.Nba_debut,
				Height: req.body.Height,
				Position: req.body.Position,
			},
			{
				where: {
					Id_player: req.params.id,
				},
			}
		)
			.then((result) => {
				console.log('Player Updated');
				res.send(result);
			})
			.catch((err) => {
				res.send('error: ' + err);
			});
	}
};

// module.exports = router;
