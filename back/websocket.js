import { WebSocketServer } from 'ws';
import db from './db.js'

const allowedIP = '127.0.0.1';

const wss = new WebSocketServer({ port: 8080 })
console.log("WebSocket server : wss://localhost:8080")

wss.on('connection', async (ws, req) => {
	const ipAddress = req.socket.remoteAddress;
	console.log(`WS-| Connection Request : ${ipAddress}`);

	var data = await db.getData('/clients');

	if (data.clients.length > 6) {
		ws.send(JSON.stringify({ id: 401, message: 'Max client limit reached. Please try again later.' }));
		ws.close();
		console.log('WS-| Connection Closed : Max clients');
		return;
	}

	const choseOne = data.clients.find((client) => client.status === 'pending') // && client.ip === ipAddress
	if (choseOne === null) {
		ws.send(JSON.stringify({ id: 404, message: 'Unexpected Request' }));
		ws.close();
		console.log('WS-| Connection Closed : Unexpected Connection Request');
		return;
	}
	
	choseOne.status = 'accepted';
	ws.on('message', (req) => {
		try {
			handleRequest(JSON.parse(req));
		} catch (err) {
			console.error('Error parsing message:', err);
		}
	});
	ws.on('close', async () => { await handleDisconnect(choseOne.userID); });
	choseOne.ws = ws;

	await db.push('/clients', data);

	console.log(`WS-| Client connected: ${data.clients.length}/6`);
});

function handleRequest(req) {
	if (req.id === 1) {
		console.log(`WS-| Player Ready: ${req.message}`)
		ws.send()
	}
}

async function handleDisconnect(uuid) {
	var data = await db.getData('/clients');
	data = { clients: data.clients.filter((client) => client.userID !== uuid) };
	await db.push('/clients', data);
	console.log(`WS-| Client disconnected: ${data.clients.length}/6`);
}

function broadcast(payload) {
	clients.forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({ id: 123, message: payload }));
		}
	});
}

// // Example of broadcasting real-time events to all clients
// setInterval(() => {
//     // Broadcasting an event to all clients every 5 seconds
//     const eventMessage = {
//         type: 'event',
//         timestamp: new Date().toISOString(),
//         content: 'This is a real-time broadcast event!'
//     };
//     broadcast(eventMessage);
// }, 5000);

export default wss;
