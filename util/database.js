const Sequelize = require('sequelize');

const sequelize = new Sequelize('nba', 'root', 'password', {
	dialect: 'mysql',
	host: 'localhost',
	pool: {
		max: 15,
		min: 0,
		idle: 10000,
		acquire: 10000,
	},
});

module.exports = sequelize;
// module.exports = Sequelize;
