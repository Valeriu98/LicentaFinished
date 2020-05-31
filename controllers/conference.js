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

// exports.postConf = (req, res, next) =>{
//     if(!)
// }
