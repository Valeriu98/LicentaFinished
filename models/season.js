const Sequelize = require("sequelize");

const sequelize = require("../util/database.js");

const Season = sequelize.define(
	"seasons",
	{
		Id_season: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		S_sd: {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: true
		},
		F_sd: {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: true
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = Season;
