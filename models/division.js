const Sequelize = require("sequelize");

const sequelize = require("../util/database.js");

const Division = sequelize.define(
	"divisions",
	{
		Id_div: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		Div_name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		Id_conf: {
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

module.exports = Division;
