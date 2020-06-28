const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('../util/database');

const Game = require('../models/game.js');

// SELECT g.G_Date as GameDate, t.Team_name as HomeTeam, x.Team_name as GuestTeam, l.Loc_name as Location
	// FROM games as g 
	// JOIN teams t ON g.Home_team = t.Id_team
	// JOIN teams x ON g.Guest_team = x.Id_team
	// JOIN locations l ON g.Id_location = l.Id_location
exports.getGames = (req, res, next) => {
	// let id = req.params.id
	let game = sequelize
		.query(
			`
	SELECT g.G_Date , t.Team_name , x.Team_name AS Guest, l.Loc_name FROM games as g 
	JOIN teams t ON g.Home_team = t.Id_team
	JOIN teams x ON g.Guest_team = x.Id_team
	JOIN locations l ON g.Id_location = l.Id_location`,
			{
				model: Game,
				mapToModel: true,
			}
		)
		.then((game) => {
			res.json(game);
		})
		.catch((err) => {
			res.send('error is ' + err);
		});
};

// !req.body.G_Date &&
// !req.body.Home_team &&
// !req.body.Guest_team &&
// !req.body.Id_location
exports.postGame = (req, res, next) => {
	if (
		!req.body.G_Date &&
		!req.body.Home_team &&
		!req.body.Guest_team &&
		!req.body.Id_location
	) {
		res.status(400).json({ error: 'Bad data' });
	} else {
		Game.create(req.body)
			.then(() => {
				res.send('Game added');
			})
			.catch((err) => {
				res.send('error' + err);
			});
	}
};

exports.putGame = (req, res, next) => {
	if (
		!req.body.G_Date &&
		!req.body.Home_team &&
		!req.body.Guest_team &&
		!req.body.Id_location
	) {
		res.status(400).json({ error: 'Bad data' });
	} else {
		Game.update(
			{
				G_Date: req.body.G_Date,
				Home_team: req.body.Home_team,
				Guest_team: req.body.Guest_team,
				Id_location: req.body.Id_location,
			},
			{
				where: {
					Id_game: req.params.id,
				},
			}
		)
			.then((result) => {
				res.send(result);
				console.log('Game Updated');
			})
			.catch((err) => {
				res.send('error: ' + err);
			});
	}
};
exports.deleteGame = (req, res, next) => {
	Game.destroy({
		where: {
			Id_game: req.params.id,
		},
	})
		.then(() => {
			res.send('Game deleted');
		})
		.catch((err) => {
			res.send('error' + err);
		});
};
// SELECT g.G_Date as GameDate, t.Team_name as HomeTeam, x.Team_name as GuestTeam, l.Loc_name as Location
// FROM games as g
// JOIN teams t ON g.Home_team = t.Id_team
// JOIN teams x ON g.Guest_team = x.Id_team
// JOIN locations l ON g.Id_location = l.Id_location
