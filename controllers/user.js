const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

const config = require('../config/config')
const User = require('../models/user');
const userControllerPolicy = require('../policies/userControllerPolicy');
const { bool } = require('joi');

function jwtSignUser (user) {
	const ONE_WEEK = 60*60*24*7
	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn: ONE_WEEK
	})
}

exports.postUserRegister = (req, res, next) => {
	if (!req.body.Email && !req.body.Password) {
		res.status(400).json({ error: 'Bad data' });
	} else {
		User.create(req.body)
			.then(() => {
				res.send({
					message: `Your user ${req.body.Email} was registered and pass is ${req.body.Password}`,
					token: jwtSignUser(req.body)

				});
			})
			.catch((err) => {
				res.send('error' + err);
			});
	}
};

exports.postUserLogin = (req, res, next) => {
	if (!req.body.Email && !req.body.Password) {
		res.status(400).json({ error: 'Bad data' });
	} else {
		User.findOne({
			where: {
				Email: req.body.Email,
			},
		})
			.then((user) => {
				const isValidPass = req.body.Password === user.Password;
				// const isValidPass = user.comparePassword(req.body.Password)
				// console.log(`################ ${isValidPass} #############`);
				if (!isValidPass) {
					return res.status(403).send({
						error: 'Login information not correct',
					});
				}
				res.send({
					message: `Your user ${req.body.Email} was logged in succesful and pass is ${req.body.Password}`,
					token: jwtSignUser(req.body)
				});
			})
			.catch((err) => {
				res.send('Email is not correct ' + err);
			});
	}
};
