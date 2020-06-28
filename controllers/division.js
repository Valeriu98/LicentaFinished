const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require('../util/database');

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

exports.getDivConf = (req, res, next) => {
	let id = req.params.id
	let divconf = sequelize.query(`SELECT d.Div_name FROM divisions as d JOIN conferences as c ON d.Id_conf = c.Id_conf WHERE d.Id_conf= ${id}`, {
		model: Division,
		mapToModel: false
	}).then((divisions) => {
		res.json(divisions)
	}).catch((err) => {
		res.send("error is " + err)
	});
}
// && !req.body.Id_conf
exports.postDiv = (req, res, next) => {
	if (!req.body.Div_name ) {
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
					Id_div: req.params.id,
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
			Id_div: req.params.id,
		},
	})
		.then(() => {
			res.send("Div deleted");
		})
		.catch((err) => {
			res.send("error: " + err);
		});
};
