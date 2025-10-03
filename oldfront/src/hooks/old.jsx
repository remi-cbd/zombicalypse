let wsConnection = null;

const handleOpen = () => {
	console.log('WebSocket connected')
	// props.setCurrentPhase('lobby')
}
const handleMessage = (event) => {
	try {
		var req = JSON.parse(event.data)
		console.log('Received message from server:', JSON.stringify(req))
	} catch (err) {
		console.error('Error parsing response:', err)
	}
}
const handleClose = () => {
	console.log('WebSocket closed')
}
const handleError = (error) => {
	console.error('WebSocket error:', error)
}

function connectToWebSocket(userID) {
	if (wsConnection !== null) {
		console.log("Already connected !")
		return
	}
	wsConnection = new WebSocket(`ws://localhost:3000/ws?uuid=${userID}`)
	wsConnection.onopen = () => handleOpen()
	wsConnection.onmessage = (event) => handleMessage(event)
	wsConnection.onclose = () => handleClose()
	wsConnection.onerror = (error) => handleError(error)
}

export { connectToWebSocket }
