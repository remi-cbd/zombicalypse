const WebSocket = require('ws'); // Import the WebSocket library

const wss = new WebSocket.Server({ port: 8080 });  // Set up WebSocket server on port 8080

// Array to store connected clients (up to 6 clients)
let clients = [];

wss.on('connection', (ws) => {
    console.log('A new client connected!');
    
    // Handle client connection (OnConnect)
    OnConnect(ws);

    // Handle incoming messages from clients
    ws.on('message', (msg) => {
        console.log('Received message from client:', msg);
        // Broadcast the message to all connected clients
        broadcast(msg);
    });

    // When the client disconnects
    ws.on('close', () => {
        console.log('A client disconnected!');
        // Remove the client from the clients array
        clients = clients.filter(client => client !== ws);
    });

    // Send a welcome message to the new client
    ws.send(JSON.stringify({ message: 'Welcome to the server!' }));
});

// OnConnect - Called when a new client connects
function OnConnect(client) {
    // Push the new client to the clients array (up to 6 clients)
    if (clients.length < 6) {
        clients.push(client);
        console.log(`Client connected. Total clients: ${clients.length}`);
    } else {
        // If there are already 6 clients, send an error message and close the connection
        client.send(JSON.stringify({ error: 'Max client limit reached. Please try again later.' }));
        client.close();
    }
}

// Broadcast function to send messages to all connected clients
function broadcast(message) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ message }));
        }
    });
}

// Example of broadcasting real-time events to all clients
setInterval(() => {
    // Broadcasting an event to all clients every 5 seconds
    const eventMessage = {
        type: 'event',
        timestamp: new Date().toISOString(),
        content: 'This is a real-time broadcast event!'
    };
    broadcast(eventMessage);
}, 5000);
