const express = require("express");
const bodyParser = require("body-parser");

// const teamsRoute = express.Router();
const Team = require("../models/team");

// //Get TEAMS
// teamsRoute.get("/teams", (req, res, next) => {
exports.getTeam = (req, res, next) => {
	Team.findAll()
		.then((team) => {
			res.json(team);
		})
		.catch((err) => {
			res.send("error is" + err);
		});
};

exports.postTeam = (req, res, next) => {
	if (
		!req.body.Team_name &&
		!req.body.Couch &&
		!req.body.City &&
		!req.body.Arena
	) {
		res.status(400).json({ error: "Bad data" });
	} else {
		Team.create(req.body)
			.then(() => {
				res.send("Team added");
			})
			.catch((err) => {
				res.send("error" + err);
			});
	}
};

exports.putTeam = (req, res, next) => {
	if (
		!req.body.Team_name &&
		!req.body.Couch &&
		!req.body.City &&
		!req.body.Arena
	) {
		res.status(400).json({ error: "Bad data" });
	} else {
		Team.update(
			{
				Team_name: req.body.Team_name,
				Couch: req.body.Couch,
				City: req.body.City,
				Arena: req.body.Arena,
			},
			{
				where: {
					Id_Team: req.params.id,
				},
			}
		)
			.then((result) => {
				res.send(result);
				console.log("Team Updated");
			})
			.catch((err) => {
				res.send("error: " + err);
			});
	}
};

exports.deleteTeam = (req, res, next) => {
	Team.destroy({
		where: {
			Id_Team: req.params.id,
		},
	})
		.then(() => {
			res.send("Team deleted");
		})
		.catch((err) => {
			res.send("error" + err);
		});
};
// module.exports = teamsRoute;
