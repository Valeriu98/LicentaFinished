const Sequelize = require("sequelize");

const sequelize = require("./util/database");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// console.log("hello world");

const Conference = require("./models/conference");
const Season = require("./models/season");

const playerRoutes = require("./routes/players");
const teamRoutes = require("./routes/teams");
const seasonRoutes = require("./routes/seasons");
const conferenceRoutes = require("./routes/conferences");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);

app.use("/api", playerRoutes);
app.use("/api", teamRoutes);
app.use("/api", seasonRoutes);
app.use("/api", conferenceRoutes);

Conference.belongsTo(Season, {
	constraints: true,
	onDelete: "CASCADE",
	foreignKey: "Id_season",
});
Season.hasMany(Conference, {
	constraints: true,
	foreignKey: "Id_season",
});

sequelize
	.sync()
	.then(() => {
		app.listen(3000, () => {
			console.log("Server started on port 3000");
		});
	})
	.catch((err) => {
		console.log("Error in main is:" + err);
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
