const fs = require("fs");

function readJSONFileGames() {
    return JSON.parse(fs.readFileSync("db.json"))["games"];
}
module.exports.readJSONFileGames = () => {
    return JSON.parse(fs.readFileSync("db.json"))["games"];
}

module.exports.writeJSONFileGames = (game) => {
    fs.writeFileSync(
        "db.json",
        JSON.stringify({ games: game }, null, 2),
        "utf8",
        err => {
            if (err) {
                console.log(err);
            }
        }
    )
}