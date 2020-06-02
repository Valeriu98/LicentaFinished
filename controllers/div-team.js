const express = require("express");
const bodyParser = require("body-parser");

const DivTeam = require("../models/div-team");

exports.getDivTeams = (req, res, next) => {
	DivTeam.findAll()
		.then((divteam) => {
			res.json(divteam);
		})
		.catch((err) => {
			res.send("error: " + err);
		});
};

exports.postDT = (req, res, next) => {
	if (!req.body.Id_div && !req.body.Id_team) {
		res.status(400).json({ error: "Bad data" });
	} else {
		DivTeam.create(req.body)
			.then(() => {
				res.send("DivTeam added");
			})
			.catch((err) => {
				res.send("error in post: " + err);
			});
	}
};

exports.putDT = (req, res, next) => {
	if (!req.body.Id_div && !req.body.Id_team) {
		res.status(400).json({ error: "Bad data" });
	} else {
		DivTeam.update(
			{
				Id_div: req.body.Id_div,
				Id_team: req.body.Id_team,
			},
			{
				where: {
					Id_teams: req.params.id,
				},
			}
		)
			.then((result) => {
				res.send(result);
				console.log("DT updated");
			})
			.catch((err) => {
				res.send("error is " + err);
			});
	}
};

exports.deleteDT = (req, res, next) => {
	DivTeam.destroy({
		where: {
			Id_teams: req.params.id,
		},
	})
		.then(() => {
			res.send("DT deleted");
		})
		.catch((err) => {
			res.send("error is " + err);
		});
};
