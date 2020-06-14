const express = require('express');
const bodyParser = require('body-parser');

const userController = require('../controllers/user');

const userControllerPolicy = require('../policies/userControllerPolicy');

const router = express.Router();

//VUE
router.post(
	'/register',
	userControllerPolicy.register,
	userController.postUserRegister
);

//VUE
router.post('/login', userController.postUserLogin);

module.exports = router;
