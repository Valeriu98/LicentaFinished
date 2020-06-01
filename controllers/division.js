const express = require("express");
const bodyParser = require("body-parser");

const Division = require("../models/division.js");

exports.getDiv = (req, res, next) => {
	Division.findAll()
		.then((division) => {
			res.send(division);
		})
		.catch((err) => {
			res.send("error: " + err);
		});
};

exports.postDiv = (req, res, next) => {
	if (!req.body.Div_name && !req.body.Id_conf) {
		res.status(400).json({ error: "Bad data" });
	} else {
		Division.create(req.body)
			.then(() => {
				res.send("Division added");
			})
			.catch((err) => {
				res.send("error: " + err);
			});
	}
};

exports.putDiv = (req, res, next) => {
	if (!req.body.Div_name && !req.body.Id_conf) {
		res.status(400).json({ error: "Bad data" });
	} else {
		Division.update(
			{
				Div_name: req.body.Div_name,
				Id_conf: req.body.Id_conf,
			},
			{
				where: {
					Id_conf: req.params.id,
				},
			}
		)
			.then((result) => {
				res.send(result);
				console.log("Division updated");
			})
			.catch((err) => {
				res.send("error: " + err);
			});
	}
};

exports.deleteDiv = (req, res, next) => {
	Division.destroy({
		where: {
			Id_conf: req.params.id,
		},
	})
		.then(() => {
			res.send("Div deleted");
		})
		.catch((err) => {
			res.send("error: " + err);
		});
};
