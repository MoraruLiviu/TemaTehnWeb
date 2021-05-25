const uuid = require("uuid");
let dbRepository = require("./dbRepository");

module.exports.getAllGames = () => {
    const gamesList = dbRepository.readJSONFileGames();
    return gamesList;
}

module.exports.addGame = (newGame) => {
    const gamesList = dbRepository.readJSONFileGames();
    newGame.id = uuid.v4.apply();
    gamesList.push(newGame);
    dbRepository.writeJSONFileGames(gamesList);

    return newGame;
}