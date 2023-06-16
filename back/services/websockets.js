//// Modules
const Websocket = require('ws')


const wss = new Websocket.Server({ port: 8080 })
wss.on('connection', ws => {
    ws.room = "1";
    ws.on('message', message => {
        console.log(`Received message => ${message}`)
        let msg = JSON.parse(message);
        if (msg.joinRoom) {ws.room = msg.joinRoom}
        if (msg.room) {websocketSendToAll(JSON.stringify(msg))}
    })
    ws.send(JSON.stringify({message: 'Hello! Message From Server!!'}))
})

/**
 * This function sends a message to all connect client within the same room
 * @param text The message, which will be sent
 */
function websocketSendToAll(text) {
    wss.clients.forEach(function each(client) {
        if (client.room === JSON.parse(text).room) {
            client.send(text);
        }
    });
}
