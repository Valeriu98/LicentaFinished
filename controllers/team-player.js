const express = require("express");
const bodyParser = require("body-parser");

const TeamPlayer = require("../models/team-player");

exports.getTeamPlayers = (req, res, next) => {
	TeamPlayer.findAll()
		.then((teamplayer) => {
			res.json(teamplayer);
		})
		.catch((err) => {
			res.send("error is" + err);
		});
};

exports.postTP = (req, res, next) => {
	if (!req.body.S_date && !req.body.Id_player && !req.body.Id_team) {
		res.status(400).json({ error: "Bad data" });
	} else {
		TeamPlayer.create(req.body)
			.then(() => {
				res.send("TeamPlayer added");
			})
			.catch((err) => {
				res.send("error in post: " + err);
			});
	}
};

exports.putTP = (req, res, next) => {
	if (!req.body.S_date && !req.body.Id_player && !req.body.Id_team) {
		res.status(400).json({ error: "Bad data" });
	} else {
		TeamPlayer.update(
			{
				S_date: req.body.S_date,
				F_date: req.body.F_date,
				Id_player: req.body.Id_player,
				Id_team: req.body.Id_team,
			},
			{
				where: {
					Id_tp: req.params.id,
				},
			}
		)
			.then((result) => {
				res.send(result);
				console.log("TP updated");
			})
			.catch((err) => {
				res.send("error is " + err);
			});
	}
};

exports.deleteTP = (req, res, next) => {
	TeamPlayer.destroy({
		where: {
			Id_tp: req.params.id,
		},
	})
		.then(() => {
			res.send("TP deleted");
		})
		.catch((err) => {
			res.send("err " + err);
		});
};
