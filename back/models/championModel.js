const champions = require('lol-champions');

//// Functions
/**
 * This function access the DB and retrieves all the users
 * @returns A list of all Users within the DB
 */
let getChampions = () => new Promise((resolve, reject) => {
    resolve(console.log(champions));
})

//// Exports
module.exports = {
    getChampions,
};