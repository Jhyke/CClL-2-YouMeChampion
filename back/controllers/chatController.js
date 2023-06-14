//// Modules

//// Services

//// Models

//// Functions
/**
 * This function renders the Chat-View to the user
 * This View shows the Chat
 *
 * @param req HTTP-Request
 * @param res HTTP-Response
 * @param next Possible-Middleware
 */
function viewChat(req,res,next){
    res.render('chat')
}

//// Exports
module.exports = {
    viewChat
};