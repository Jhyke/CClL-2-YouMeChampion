//// Modules
const mysql = require('mysql');


const config = mysql.createConnection({
    host: "213.47.34.218",
    port: 42069,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "IgorsDatabase"
});


config.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = {config};
