const Sequelize = require("sequelize");

const sequelize = new Sequelize("nba", "root", "password", {
	dialect: "mysql",
	host: "localhost",
});

module.exports = sequelize;
// module.exports = Sequelize;
