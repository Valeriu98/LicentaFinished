var express = require("express");

const playerController = require("../controllers/player");

const router = express.Router();

router.get("/players", playerController.getPlayers);

router.get("/player/:id", playerController.getPlayer);

router.post("/player", playerController.postPlayer);

router.delete("/player/:id", playerController.deletePlayer);

router.put("/player/:id", playerController.putPlayer);

module.exports = router;
// const express = require("express");
// const bodyParser = require("body-parser");

// var router = express.Router();
// const Player = require("../models/player");

// // GET PLAYERS
// router.get("/players", (req, res, next) => {
// 	Player.findAll()
// 		.then((player) => {
// 			res.json(player);
// 		})
// 		.catch((err) => {
// 			res.send("error is" + err);
// 		});
// });

// //ADD PLAYERS
// router.post("/players", (req, res, next) => {
// 	if (
// 		!req.body.F_name &&
// 		!req.body.L_name &&
// 		!req.body.Born &&
// 		!req.body.College &&
// 		!req.body.Nba_debut &&
// 		!req.body.Height &&
// 		!req.body.Position
// 	) {
// 		res.status(400).json({ error: "Bad data" });
// 	} else {
// 		Player.create(req.body)
// 			.then(() => {
// 				res.send("Player added");
// 			})
// 			.catch((err) => {
// 				res.send("error " + err);
// 			});
// 	}
// });

// //DELETE player
// router.delete("/player/:id", (req, res, next) => {
// 	Player.destroy({
// 		where: {
// 			Id_player: req.params.id,
// 		},
// 	})
// 		.then(() => {
// 			res.send("Player Deleted");
// 		})
// 		.catch((err) => {
// 			res.send("error" + err);
// 		});
// });

// //UPDATE player
// router.put("/player/:id", (req, res, next) => {
// 	if (
// 		!req.body.F_name &&
// 		!req.body.L_name &&
// 		!req.body.Born &&
// 		!req.body.College &&
// 		!req.body.Nba_debut &&
// 		!req.body.Height &&
// 		!req.body.Position
// 	) {
// 		res.status(400).json({ error: "Bad data" });
// 	} else {
// 		Player.update(
// 			{
// 				F_name: req.body.F_name,
// 				L_name: req.body.L_name,
// 				Born: req.body.Born,
// 				College: req.body.College,
// 				Nba_debut: req.body.Nba_debut,
// 				Height: req.body.Height,
// 				Position: req.body.Position,
// 			},
// 			{
// 				where: {
// 					Id_player: req.params.id,
// 				},
// 			}
// 		)
// 			.then((result) => {
// 				console.log("Player Updated");
// 				res.send(result);
// 			})
// 			.catch((err) => {
// 				res.send("error: " + err);
// 			});
// 	}
// });

// module.exports = router;
