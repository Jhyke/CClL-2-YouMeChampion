//// Modules
const bcrypt = require('bcrypt');

//// Services
const db = require('../services/database.js').config;

//// Functions
//TODO: rework some of the resolves
/**
 * This function access the DB and retrieves all the users
 * @returns A list of all Users within the DB
 */
let getUsers = () => new Promise((resolve, reject) => {
    let sql = "SELECT * FROM users";

    db.query(sql, function (err, users, fields) {
        if (err) {
            reject(err)
        } else {
            resolve(users)
        }
    })
})

/**
 * This function access the DB and retrieves all information form a specific user
 * @param id The ID of the User in question
 * @returns An object, which represents the user
 */
let getUser = (id) => new Promise((resolve, reject) => {
    let sql = "SELECT * FROM users WHERE userID ="+ parseInt(id);
    db.query(sql, function (err, user, fields) {
        if (err) {
            console.log(err);
            reject(err)
        } else {
            if(!user[0]){
                console.log("user not found");
                reject("user not found");
            }
            console.log(user[0]);
            resolve(user[0])
        }
    })
})


//TODO retrieve userID from JWT
/**
 * This function updates a User in the DB
 * @param userData The Updated-Data of the User
 * @param userId The ID of the Use in question
 * @returns The result of the db.query
 */
let updateUser = (userData, userId) => new Promise(async(resolve, reject)=>{
    userData.password = await bcrypt.hash(userData.password, 10);
    let sql = "UPDATE users SET" +
        " userName = "+ db.escape(userData.name) +
        ", userEmail = "+ db.escape(userData.email) +
        ", userPassword = "+ db.escape(userData.password)+
        " WHERE userID = " + parseInt(userId);
    console.log(sql);
    db.query(sql, function (err, result, fields){
        if(err) {
            console.log(err)
            reject(err)
        }
        console.log(result.affectedRows + " rows have been affected")
        resolve(result)
    })
})

/**
 * This function add a new User to the DB
 * @param userData The Data, which the new user will have
 * @returns An object, which represents the newly created user
 */
let addUser = (userData) => new Promise (async (resolve, reject)=> {
    userData.password = await bcrypt.hash(userData.password, 10);
    let sql = "INSERT INTO users (userName, userEmail, userPassword)" +
        " VALUES (" +  db.escape(userData.name) +
        "," + db.escape(userData.email) +
        "," + db.escape(userData.password) +
        ")";
    console.log(sql);
    db.query(sql, function (err, result, fields){
        if(err) {
            console.log(err);
            reject(err)
        }
        else{
            console.log(result.affectedRows + " rows have been added")
            userData.id = result.insertId;
            console.log(result.insertId);
            resolve(userData)
        }
    })
})

//TODO: change resolve
/**
 * This function deletes a User from the DB
 * @param id The ID of the Use in question
 * @returns The ID of the user
 */
let deleteUser = (id) => new Promise ((resolve, reject) => {
    let sql = "DELETE FROM users WHERE userID =" + parseInt(id);

    db.query(sql, function (err, result, fields){
        if(err) {
            console.log(err);
            reject(err)
        }
        else{
            console.log(sql);
            console.log(resolve);
            console.log(result.affectedRows + " rows have been deleted")
            resolve(id)
        }
    })
})


//// Exports
module.exports = {
    getUsers,
    getUser,
    updateUser,
    addUser,
    deleteUser
};
