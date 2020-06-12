const express = require('express');
const bodyParser = require('body-parser');

const User = require('../models/user');

exports.postUser = (req, res, next) => {
	if (!req.body.Email && !req.body.Password) {
		res.status(400).json({ error: 'Bad data' });
	} else {
		User.create(req.body)
			.then(() => {
				res.send({
					message: `Your user ${req.body.email} was registered and pass is ${req.body.password}`,
				});
			})
			.catch((err) => {
				res.send('error' + err);
			});
	}
};
