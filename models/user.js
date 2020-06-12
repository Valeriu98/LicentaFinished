const Sequelize = require('sequelize');

const sequelize = require('../util/database.js');

const User = sequelize.define(
	'users',
	{
		Id_user: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		Email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		Password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = User;
