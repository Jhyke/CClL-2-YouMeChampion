//// Modules
const bcrypt = require('bcrypt');
const {authenticateJWT, authenticateUser} = require("../services/authentication");
const authenticationService = require("../services/authentication");

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
            console.log(users)
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
    console.log("Update user triggered in userModel");
    userData.password = await bcrypt.hash(userData.pw, 10);
    let sql = "UPDATE users SET" +
        " userName = "+ db.escape(userData.uname) +
        ", userPosi = "+ db.escape(userData.posi) +
        ", userSecPosi = "+ db.escape(userData.secPosi) +
        ", userIGN = "+ db.escape(userData.ign) +
        ", userEmail = "+ db.escape(userData.email) +
        ", userPassword = "+ db.escape(userData.password)+
        ", userDescription = "+ db.escape(userData.desc)+
        " WHERE userID = " + parseInt(userId);
    console.log(sql);
    db.query(sql, function (err, result, fields){
        if(err) {
            console.log(err)
            reject(err)
        }else{
            console.log(result.affectedRows + " rows have been affected")
            resolve(result)
        }
    })
})

/**
 * This function add a new User to the DB
 * @param userData The Data, which the new user will have
 * @returns An object, which represents the newly created user
 */
let addUser = (userData) => new Promise (async (resolve, reject)=> {
    userData.pw = await bcrypt.hash(userData.pw, 10);
    let sql = "INSERT INTO users (userName, userEmail, userPassword)" +
        " VALUES (" +  db.escape(userData.uname) +
        "," + db.escape(userData.email) +
        "," + db.escape(userData.pw) +
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

let addFriend = (userID, friendID) => new Promise ((resolve, reject) => {
    let sql = "INSERT INTO userFriends (userID_1, userID_2)"+
        " VALUES (" + userID +
        ", " + friendID +
        ")";

    db.query(sql, function (err, result, fields){
        if(err){
            console.log(err);
            reject(err);
        }
        console.log(result.affectedRows + " rows have been added");
        resolve();
    })
})

/**
 * This function access the DB and retrieves all the friends for the user
 * @returns A list of all friends within the DB for this user
 */
let getFriends = (id) => new Promise((resolve, reject) => {
    let sql = "SELECT * FROM userFriends"+
        " INNER JOIN users"+
        " ON userFriends.userID_2 = users.userID"+
        " WHERE userID_1 =" + parseInt(id);

    db.query(sql, function (err, friends, fields) {
        if (err) {
            console.log("Error in getFriends" + err)
            reject(err)
        } else {
            console.log(friends)
            resolve(friends)
        }
    })
})


//// Exports
module.exports = {
    getUsers,
    getUser,
    updateUser,
    addUser,
    deleteUser,
    addFriend,
    getFriends
};
