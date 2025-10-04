// import db from '../db.js'

// let clients = []

// function handleRequest(req) {
// 	try {
// 		var jsonReq = (JSON.parse(req))
// 		console.log('WS-| Received request: ' + JSON.stringify(jsonReq))
// 		// if (jsonReq.id === 1) {
// 		// 	console.log(`WS-| Player Ready: ${jsonReq.message}`)
// 		// 	ws.send()
// 		// }
// 	} catch (err) {
// 		console.error('WS-| Error parsing request:', err)
// 	}
// }

// async function handleDisconnect(uuid) {
// 	var data = await db.getData('/clients')
// 	data = { clients: data.clients.filter((client) => client.userID !== uuid) }
// 	await db.push('/clients', data)
// 	console.log(`WS-| Client disconnected: ${data.clients.length}/6`)
// }

// // function broadcast(payload) {
// // 	clients.forEach(client => {
// // 		if (client.readyState === WebSocket.OPEN) {
// // 			client.send(JSON.stringify({ id: 123, message: payload }))
// // 		}
// // 	})
// // }

// // // Example of broadcasting real-time events to all clients
// // setInterval(() => {
// //     // Broadcasting an event to all clients every 5 seconds
// //     const eventMessage = {
// //         type: 'event',
// //         timestamp: new Date().toISOString(),
// //         content: 'This is a real-time broadcast event!'
// //     }
// //     broadcast(eventMessage)
// // }, 5000)

// const authenticate = async (req) => {
// 	// const token = JSON.parse(request.url, true).query
// 	const token = 'blue'
// 	var data = await db.getData('/clients')
// 	data = data.clients.filter((client) => client.userID === token)
// 	console.log(`auth data = ${JSON.stringify(data)}`)
// 	return (data !== null)
// }

// function safeStringify(obj) {
// 	return JSON.stringify(obj, (key, value) => {
// 	  if (key === 'self') return undefined; // Prevent logging of circular references (or handle them)
// 	  return value;
// 	});
//   }

// function initialize(wsServer) {
// 	wsServer.on('connection', async (ws, req) => {

// 		// console.dir(req, { depth: null, showHidden: false });

// 		const ipAddress = req.socket.remoteAddress
// 		console.log(`WS-| Connection Request : ${ipAddress}`)

// 		const authed = await authenticate(req)
// 		console.log(`authed = ${JSON.stringify(authed)}`)

// 		var data = await db.getData('/clients')

// 		if (data.clients.length > 6) {
// 			ws.send(JSON.stringify({ id: 401, message: 'Max client limit reached. Please try again later.' }))
// 			ws.close()
// 			console.log('WS-| Connection closed: Max clients')
// 			return
// 		}

// 		const choseOne = data.clients.find((client) => client.status === 'pending') // && client.ip === ipAddress
// 		if (choseOne === null) {
// 			ws.send(JSON.stringify({ id: 404, message: 'Unexpected Request' }))
// 			ws.close()
// 			console.log('WS-| Connection closed: Unexpected Connection Request')
// 		}
// 		choseOne.status = 'accepted'
// 		await db.push('/clients', data)

// 		ws.on('message', (req) => { handleRequest(req) })
// 		ws.on('close', async () => { await handleDisconnect(choseOne.userID) })
// 		clients.push(ws)

// 		console.log(`WS-| Client connected: ${data.clients.length}/6`)
// 	})
// }

// export { initialize }
