const express = require("express");
const bodyParser = require("body-parser");

const Conference = require("../models/conference.js");

exports.getConf = (req, res, next) => {
	Conference.findAll()
		.then((conference) => {
			res.send(conference);
		})
		.catch((err) => {
			res.send("error: " + err);
		});
};

exports.postConf = (req, res, next) => {
	if (!req.body.Conf && !req.body.Id_season) {
		res.status(400).json({ error: "Bad data" });
	} else {
		Conference.create(req.body)
			.then(() => {
				res.send("Conferences added in season " + req.body.Id_season);
			})
			.catch((err) => {
				res.send("error in post: " + err);
			});
	}
};

exports.putConf = (req, res, next) => {
	if (!req.body.Conf && !req.body.Id_season) {
		res.status(400).json({ error: "Bad data" });
	} else {
		Conference.update(
			{
				Conf: req.body.Conf,
				Id_season: req.body.Id_season,
			},
			{
				where: {
					Id_conf: req.params.id,
				},
			}
		)
			.then((result) => {
				res.send(result);
				console.log("Conference updated");
			})
			.catch((err) => {
				res.send("error: " + err);
			});
	}
};

exports.deleteConf = (req, res, next) => {
	Conference.destroy({
		where: {
			Id_conf: req.params.id,
		},
	})
		.then(() => {
			res.send("Conf deleted");
		})
		.catch((err) => {
			res.send("error" + err);
		});
};
