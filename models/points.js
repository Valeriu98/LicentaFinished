const Sequelize = require("sequelize");

const sequelize = require("../util/database.js");

const Points = sequelize.define(
	"p_points",
	{
		Id_points: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		Total_pts: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		Nr_3PT: {
			type: Sequelize.INTEGER,
            allowNull: false,
            // foreignKey: true
		},
		Nr_FTT: {
			type: Sequelize.INTEGER,
            allowNull: true,
            // foreignKey: true
		},
		Nr_FGT: {
			type: Sequelize.INTEGER,
            allowNull: true,
            // foreignKey: true
		},
		Id_game: {
			type: Sequelize.INTEGER,
			allowNull: false,
			foreignKey: true
		},
		Id_player: {
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

module.exports = Points;
