//// Modules
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

/**
 * This function tries to authenticate the user based on given data
 * @param uname The username of the user
 * @param pw The encrypted password of the user
 * @param users A list of all users
 * @param res The HTTP-Response
 */
async function authenticateUser({uname, pw}, users, res){
    const user = users.find(u => {
        return u.name === uname
    });
    //returns pending promise --> doesn't render true
    if (user && await checkPassword(pw, user.password)) {
    // Generate an access token
        console.log(ACCESS_TOKEN_SECRET);
        const accessToken = jwt.sign({ id: user.id, name: user.name }, ACCESS_TOKEN_SECRET, { expiresIn: '1000d' });
        res.cookie('accessToken', accessToken);
        res.redirect('/users/' + user.id)
    } else {
        res.send('Username or password incorrect');
    }
};

/**
 * This function checks if the authentication is valid based on the JWT Token
 * @param req HTTP-Request
 * @param res HTTP-Response
 * @param next Possible-Middleware
 */
function authenticateJWT(req, res, next){
    const token = req.cookies['accessToken'];
    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            console.log(user)
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

//TODO: HIGH Change ugly ass fucking code
/**
 * This function get the userID based on the JWT
 * @param req The HTTP-Request
 * @returns {string} The ID of the User
 */
function getUserId(req){
    const token = req.cookies['accessToken'];
    let userId = "";
    console.log("Token " + token)
    if (token) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (!err) {
                console.log(user)
                userId = user.id;
            }
        });
    }
    return userId;
}

/**
 * This functions, checks if the password is correct
 * @param password The given password
 * @param hash The hashed password
 * @returns The result of the password check
 */
async function checkPassword(password, hash){
    let pw = await bcrypt.compare(password, hash)
    console.log(password);
    console.log(pw);
    return pw;
}


module.exports = {
    authenticateUser,
    authenticateJWT,
    getUserId
};