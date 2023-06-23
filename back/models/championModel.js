const axios = require('axios');
const bcrypt = require("bcrypt");
const {config: db} = require("../services/database");

//// Functions

/**
 * Retrieves all champions from the external API.
 *
 * @returns {Promise} A promise that resolves to the JSON data containing all champions.
 */
let getChampions = () => new Promise((resolve, reject) => {
    axios.get('http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json')
        .then(response => {
            const jsonData = response.data;
            resolve(jsonData); // Resolve the promise with the retrieved JSON data
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
            reject(error); // Reject the promise with the error if fetching the JSON data fails
        });
});

/**
 * Adds a champion to the user's collection in the database.
 *
 * @param {number} userId - The ID of the user.
 * @param {string} champID - The ID of the champion.
 * @param {string} pos - The position of the champion.
 * @returns {Promise} A promise that resolves when the champion is added successfully.
 */
let addChampion = (userId, champID, pos) => new Promise(async (resolve, reject) => {
    console.log("addChampion triggered in Model");
    let sql = "INSERT INTO userChampions (userID, championID, userChampionPos)" +
        " VALUES (" + db.escape(userId) +
        ", " + db.escape(champID) +
        ", " + db.escape(pos) +
        ")";
    console.log(sql);
    db.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            reject(err); // Reject the promise with the error if adding the champion fails
        } else {
            console.log(result.affectedRows + " rows have been added");
            resolve(); // Resolve the promise when the champion is added successfully
        }
    });
});

/**
 * Retrieves selected champions for a user from the database.
 *
 * @param {number} id - The ID of the user.
 * @returns {Promise} A promise that resolves to the selected champion data.
 */
let getSelChampion = (id) => new Promise((resolve, reject) => {
    console.log("getSelChampion triggered in Model");
    let sql = "SELECT * FROM userChampions" +
        " WHERE userID =" + parseInt(id);

    console.log(sql);
    db.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            reject(err); // Reject the promise with the error if retrieving the selected champion fails
        } else {
            console.log(result.affectedRows + " rows have been added");
            resolve(result); // Resolve the promise with the retrieved selected champion data
        }
    });
});

//// Exports
module.exports = {
    getChampions,
    addChampion,
    getSelChampion
};
