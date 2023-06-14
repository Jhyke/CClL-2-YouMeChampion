//// Modules
require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs')
const morgan = require('morgan');
const ws = require('./services/websockets');

//// App
const app = express();
// DISCUSS: put into .env
const port = 3000;

// create a write-stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/requests.log'), { flags: 'a' })
// available formats: combined, common, dev, short, and tiny
// write detailed logs into the specified file
app.use(morgan('combined', { stream: accessLogStream }))
// write short logs into the console
//app.use(morgan('common'))


//// Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const registerRouter = require('./routes/register');
const chatRouter = require('./routes/chat');
const championsRouter = require('./routes/champions');
const {authenticateJWT} = require("./services/authentication");


//// App - Configuration
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    createParentPath: true
}));
app.use(cookieParser());

app.use(authenticateJWT);
//// App - Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/chat', chatRouter);
app.use('/champions', championsRouter);
app.use(express.static('public'));
app.use(errorHandler);
// 404 - Page, when user tries to access Site, which doesn't exist
app.all('*', notFound);

//// Functions

/**
 * This function renders an error to the User through the error-view
 * This View displays an error to the User
 *
 * @param err The error message
 * @param req HTTP-Request
 * @param res HTTP-Response
 * @param next Possible-Middleware
 */
function errorHandler(err, req, res, next){
    res.render('error', {error:err});
}

/**
 * This function renders the PageNotFound-View
 * This View displays that a certain page cannot be found
 *
 * @param req HTTP-Request
 * @param res HTTP-Response
 * @param next Possible-Middleware
 */
function notFound(req,res,next){
    res.status(404);
    res.render('404', {url : req.url})
}

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});