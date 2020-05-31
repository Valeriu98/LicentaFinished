const express = require("express");
const bodyParser = require("body-parser");

const Season = require("../models/season");

exports.getSeason = (req, res, next) => {
	Season.findAll()
		.then((season) => {
			res.json(season);
		})
		.catch((err) => {
			res.send("error is" + err);
		});
};

exports.postSeason = (req, res, next) => {
	if (!req.body.S_sd && !req.body.F_sd) {
		res.status(400).json({ error: "Bad data" });
	} else {
		Season.create(req.body)
			.then(() => {
				res.send("Season added");
			})
			.catch((err) => {
				res.send("error " + err);
			});
	}
};

exports.putSeason = (req, res, next) => {
	if (!req.body.S_sd && !req.body.F_sd) {
		res.status(400).json({ error: "Bad data" });
	} else {
		Season.update(
			{
				S_sd: req.body.S_sd,
				F_sd: req.body.F_sd,
			},
			{
				where: {
					Id_season: req.params.id,
				},
			}
		)
			.then((result) => {
				res.send(result);
				console.log("Season updated");
			})
			.catch((err) => {
				res.send("error: " + err);
			});
	}
};

exports.deleteSeason = (req, res, next) => {
	Season.destroy({
		where: {
			Id_season: req.params.id,
		},
	})
		.then(() => {
			res.send("season deleted");
		})
		.catch((err) => {
			res.send("error" + err);
		});
};
