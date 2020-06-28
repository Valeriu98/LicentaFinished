const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require('../util/database');

const Points = require("../models/points");

exports.getPoints = (req, res, next) => {
	// let id = req.params.id
	let points = sequelize.query(`
	SELECT g.Id_game as Game,  p.L_name as Player, t.Team_name as Team, pt.Total_pts as TotalPoints, pt.Nr_3PT as 3PT, pt.Nr_FGT as FGT, pt.Nr_FTT as FTT 
FROM p_points as pt
join players p ON pt.Id_player = p.Id_player Join teams t ON p.Id_team= t.Id_team
join games g on pt.Id_game = g.Id_game`, {
		model: Points,
		mapToModel: true
	}).then((points) => {
		res.json(points)
	}).catch((err) => {
		res.send("error is " + err)
	});
};


// !req.body.G_Date &&
// !req.body.Home_team &&
// !req.body.Guest_team &&
// !req.body.Id_location
exports.postPoint = (req, res, next) => {
	if(
		
		!req.body.Id_game 
	) {
		res.status(400).json({ error: "Bad data"});
	} else {
		Points.create(req.body)
			.then(() => {
				res.send("Points added");
			})
			.catch((err) => {
				res.send("error" + err);
			});
	}
}

exports.putGame = (req, res, next) => {
	if (
		!req.body.G_Date
	) {
		res.status(400).json({ error: "Bad data" });
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
				console.log("Game Updated");
			})
			.catch((err) => {
				res.send("error: " + err);
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
			res.send("Game deleted");
		})
		.catch((err) => {
			res.send("error" + err);
		});
};
// SELECT g.G_Date as GameDate, t.Team_name as HomeTeam, x.Team_name as GuestTeam, l.Loc_name as Location
// FROM games as g 
// JOIN teams t ON g.Home_team = t.Id_team
// JOIN teams x ON g.Guest_team = x.Id_team
// JOIN locations l ON g.Id_location = l.Id_location