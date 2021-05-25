var express = require('express');
var router = express.Router();

let dbService = require("./dbservice");
let dbRepository = require("./dbrepository");

router.get("/games", (req, res) => {
    let gamesList = dbService.getAllGames();
    if (gamesList != undefined && gamesList.length != 0) {
        res.status(200).send(gamesList);
    } else {
        res.status(404).send("No games found");
    }
});

router.get("/games/:id", (req, res) => {
    let gamesList = dbService.getAllGames();
    let id = req.params.id;
    let checkExists = false;
    gamesList.forEach(game => {
        if (game.id == id) {
            checkExists = true;
            res.status(200).send(game);
        }
    })

    if (checkExists === false) {
        res.status(404).send("No game found");
    }
});

router.post("/games", (req, res) => {
    console.log(req);
    let newGame = dbService.addGame(req.body);
    res.status(200).send(newGame);
});

router.put("/games/:id", (req, res) => {

    const gamesList = dbService.getAllGames();
    let id = req.params.id;
    let checkExists = false;

    for (let i = 0; i < gamesList.length; i++) {
        if (gamesList[i].id == id) {
            if (req.body.name) {
                gamesList[i].name = req.body.name;
            }

            if (req.body.img) {
                gamesList[i].img = req.body.img;
            }

            if (req.body.developer) {
                gamesList[i].developer = req.body.developer;
            }

            if (req.body.publisher) {
                gamesList[i].publisher = req.body.publisher;
            }

            checkExists = true;
        }
    }

    if (checkExists === true) {
        dbRepository.writeJSONFileGames(gamesList);
        res.status(200).send("Game successfully updated!");
    } else {
        res.status(404).send("No game found!");
    }
});

router.delete("/games/:id", (req, res) => {

    const gamesList = dbService.getAllGames();
    let id = req.params.id;
    let checkExists = false;

    for (let i = 0; i < gamesList.length; i++) {
        if (gamesList[i].id == id) {
            checkExists = true;
            gamesList.splice(i, 1);
        }
    }

    if (checkExists === true) {
        dbRepository.writeJSONFileGames(gamesList);
        res.status(200).send("Game deleted!");
    } else {
        res.status(404).send("Game not found!");
    }
});


module.exports = router;