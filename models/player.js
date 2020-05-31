const Sequelize = require("sequelize");

const sequelize = require("../util/database.js");

const Player = sequelize.define(
	"players",
	{
		Id_player: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		F_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		L_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		Born: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		College: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		Nba_debut: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		Height: {
			type: Sequelize.FLOAT,
			allowNull: true,
		},
		Position: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = Player;
