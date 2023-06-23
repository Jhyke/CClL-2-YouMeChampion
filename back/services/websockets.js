//// Modules
const Websocket = require('ws')

// Create a WebSocket server instance
const wss = new Websocket.Server({ port: 8080 })

// Event handler for new WebSocket connections
wss.on('connection', ws => {
    ws.room = "1"; // Set the default room for the WebSocket connection

    // Event handler for incoming messages from clients
    ws.on('message', message => {
        console.log(`Received message => ${message}`);
        let msg = JSON.parse(message);

        // Check if the message contains a 'joinRoom' property
        if (msg.joinRoom) {
            ws.room = msg.joinRoom; // Set the room of the current WebSocket connection
        }

        // Check if the message contains a 'room' property
        if (msg.room) {
            websocketSendToAll(JSON.stringify(msg)); // Send the message to all connected clients in the same room
        }
    });

    // Send a welcome message to the newly connected client
    ws.send(JSON.stringify({ message: 'Hello! Click on a room to join and start texting :D' }));
});

/**
 * This function sends a message to all connected clients within the same room
 * @param text The message to be sent
 */
function websocketSendToAll(text) {
    wss.clients.forEach(function each(client) {
        if (client.room === JSON.parse(text).room) {
            client.send(text);
        }
    });
}
