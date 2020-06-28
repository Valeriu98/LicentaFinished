const Sequelize = require("sequelize");

const sequelize = require("../util/database.js");

const Game = sequelize.define(
	"games",
	{
		Id_game: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		G_Date: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		Home_team: {
			type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true
		},
		Guest_team: {
			type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true
		},
		Id_location: {
			type: Sequelize.INTEGER,
			allowNull: false,
			foreignKey: true
		}
		
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = Game;
