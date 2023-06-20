const axios = require('axios');


//// Functions
/**
 * This function access the DB and retrieves all the users
 * @returns A list of all Users within the DB
 */
let getChampions = () => new Promise((resolve, reject) => {
    axios.get('http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json')
        .then(response => {
            const jsonData = response.data;
            resolve(jsonData);
            // Use the retrieved JSON data here
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
            reject(error);
        });
})

//// Exports
module.exports = {
    getChampions,
};