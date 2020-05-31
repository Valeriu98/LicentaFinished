const Sequelize = require("sequelize");

const sequelize = require("../util/database.js");

const Conference = sequelize.define(
	"conferences",
	{
		Id_conf: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		Conf: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		// Id_season: {
		// 	type: Sequelize.INTEGER,
		// 	allowNull: false,
		// },
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = Conference;
