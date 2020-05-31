const Sequelize = require("sequelize");

const sequelize = require("../util/database.js");

const Team = sequelize.define(
	"teams",
	{
		Id_team: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		Team_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		Couch: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		City: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		Arena: {
			type: Sequelize.STRING,
			allowNull: true,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = Team;
