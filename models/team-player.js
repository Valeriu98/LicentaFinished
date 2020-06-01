const Sequelize = require("sequelize");

const sequelize = require("../util/database.js");

const TeamPlayer = sequelize.define(
	"teamplayers",
	{
		Id_tp: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		S_date: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		F_date: {
			type: Sequelize.DATE,
			allowNull: true,
		},
		Id_player: {
			type: Sequelize.INTEGER,
			allowNull: false,
			foreignKey: true,
		},
		Id_team: {
			type: Sequelize.INTEGER,
			allowNull: false,
			foreignKey: true,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = TeamPlayer;
