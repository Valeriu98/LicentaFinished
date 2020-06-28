const express = require('express');
const bodyParser = require('body-parser');
const database = require('../util/database');
// var router = express.Router();
const Player = require('../models/player');
const sequelize = require('../util/database');

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

exports.getTeamPlayers = (req, res, next) => {
	let test = req.params.id
	let players = sequelize.query(`SELECT p.F_name, p.L_name, p.Born, p.College, p.Nba_debut, p.Height, p.Position, t.Team_name FROM players as p Join teams as t ON p.Id_team = t.Id_team WHERE p.Id_team = ${test}`,{

		model: Player,
		mapToModel: true
	}).then((players) => {
			res.json(players)
	}).catch((err) => {
		res.send("error is " + err)
	})
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
// !req.body.Born &&
		// !req.body.College &&!req.body.College &&
// 		!req.body.Nba_debut &&
// 		!req.body.Height &&
// !req.body.Height &&// 		!req.body.Position
// router.put("/player/:id", (req, res, next) => {
exports.putPlayer = (req, res, next) => {
	if (
		!req.body.F_name &&
		!req.body.L_name &&
		!req.body.Born &&
		
		!req.body.Nba_debut &&
		
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
				PlayerImage: req.body.PlayerImage
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
