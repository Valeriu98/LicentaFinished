const Sequelize = require('sequelize');

const sequelize = require('./util/database');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

// console.log("hello world");

const Conference = require('./models/conference');
const Division = require('./models/division');
const Season = require('./models/season');
const Player = require('./models/player');
const Team = require('./models/team');
const TeamPlayer = require('./models/team-player');

const playerRoutes = require('./routes/players');
const teamRoutes = require('./routes/teams');
const seasonRoutes = require('./routes/seasons');
const conferenceRoutes = require('./routes/conferences');
const divisionRoutes = require('./routes/divisions');
const teamPlayerRoutes = require('./routes/team-players');
const divTeamRoutes = require('./routes/div-teams');
const registerRoutes = require('./routes/registers');

const app = express();

app.use(cors());

app.use(morgan('combined'));

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

app.use('/api', playerRoutes);
app.use('/api', teamRoutes);
app.use('/api', seasonRoutes);
app.use('/api', conferenceRoutes);
app.use('/api', divisionRoutes);
app.use('/api', teamPlayerRoutes);
app.use('/api', divTeamRoutes);
app.use('/api', registerRoutes);

Conference.belongsTo(Season, {
	constraints: true,
	onDelete: 'CASCADE',
	foreignKey: 'Id_season',
});
Season.hasMany(Conference, {
	constraints: true,
	foreignKey: 'Id_season',
	onDelete: 'CASCADE',
});

Division.belongsTo(Conference, {
	constraints: true,
	foreignKey: 'Id_conf',
	onDelete: 'CASCADE',
});

Conference.hasMany(Division, {
	constraints: true,
	foreignKey: 'Id_conf',
	onDelete: 'CASCADE',
});
// Player.belongsToMany(Team, { through: TeamPlayer, foreignKey: "Id_player" });
// Team, belongsToMany(Player, { through: TeamPlayer, foreignKey: "Id_team" });

//Many to many team players
Player.associate = function (models) {
	Player.belongsToMany(models.Team, {
		through: 'teamplayers',
		// as: "teams",
		foreignKey: 'Id_player',
		otherKey: 'Id_team',
	});
};

Team.associate = function (models) {
	Team.belongsToMany(models.Player, {
		through: 'teamplayers',
		// as: "players",
		foreignKey: 'Id_team',
		otherKey: 'Id_player',
	});
};

//Many-to-many divteams
Division.associate = function (models) {
	Division.belongsToMany(models.Team, {
		through: 'divteams',
		// as: "teams",
		foreignKey: 'Id_div',
		otherKey: 'Id_team',
	});
};

Team.associate = function (models) {
	Team.belongsToMany(models.Division, {
		through: 'divteams',
		// as: "players",
		foreignKey: 'Id_team',
		otherKey: 'Id_div',
	});
};

sequelize
	.sync()
	.then(() => {
		app.listen(3000, () => {
			console.log('Server started on port 3000');
		});
	})
	.catch((err) => {
		console.log('Error in main is:' + err);
	});
// sequelize
// 	.authenticate()
// 	.then(() => {
// 		console.log("Connection has been established successfully.");
// 		app.listen(3000);
// 	})
// 	.catch((err) => {
// 		console.error("Unable to connect to the database:", err);
// 	});
// const Player = sequelize.define(
//     ''
// );
