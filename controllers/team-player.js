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
