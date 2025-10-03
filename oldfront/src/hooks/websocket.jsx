import { useState, useEffect, useCallback } from 'preact/hooks';

const useWebSocket = (url) => {
	const [socket, setSocket] = useState(null);
	const [messages, setMessages] = useState([]);
	const [status, setStatus] = useState('Disconnected');

	const handleOpen = () => {
		console.log('WebSocket connected')
		setStatus('Connected');
		// setCurrentPhase('lobby')
	}
	const handleMessage = (event) => {
		setMessages((prevMessages) => [...prevMessages, event.data]);
		try {
			var req = JSON.parse(event.data)
			console.log('Received message from server:', JSON.stringify(req))
		} catch (err) {
			console.error('Error parsing response:', err)
		}
	}
	const handleClose = () => {
		console.log('WebSocket closed')
		setStatus('Disconnected');
		setSocket(null)
		// setCurrentPhase('connect')
	}
	const handleError = (error) => {
		console.error('WebSocket error:', error)
		setStatus('Error');
	}

	useEffect(() => {
		const ws = new WebSocket(url);
		ws.onopen = () => { handleOpen() };
		ws.onmessage = (event) => { handleMessage() };
		ws.onerror = (error) => { handleError() };
		ws.onclose = () => { handleClose() };
		setSocket(ws);
		return () => {
			ws.close();
		};
	}, [url]);

	const sendMessage = useCallback((message) => {
		if (socket && socket.readyState === WebSocket.OPEN) {
			socket.send(message);
		}
	}, [socket]);

	return { socket, messages, status, sendMessage };
};

export default useWebSocket;
