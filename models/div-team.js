const Sequelize = require("sequelize");

const sequelize = require("../util/database.js");

const DivTeam = sequelize.define(
	"divteams",
	{
		Id_teams: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		Id_div: {
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

module.exports = DivTeam;
