import { useState } from 'preact/hooks';

import '../styles/connect.css';

const ConnectComponent = (props) => {
	const connectToWebSocket = (data) => {
		if (props.wsConnection !== null) {
			console.log("Already connected !");
			console.log(props.wsConnection);
			return;
		}

		const ws = new WebSocket('ws://localhost:8080');
		ws.onopen = () => {
			console.log('WebSocket connected');
			props.setWsConnection(ws);
			props.setCurrentPhase('lobby');
			props.setUserID(data);
		};
		ws.onmessage = (event) => {
			try {
				handleRequest(JSON.parse(event.data));
			} catch (err) {
				console.error('Error parsing response:', err);
			}
		};
		ws.onclose = () => {
			console.log('WebSocket closed');
		};
		ws.onerror = (error) => {
			console.error('WebSocket error:', error);
		};
	};

	const handleRequest = (req) => {
		console.log('Received message from server:', req);
		if (req.id === 1) {

		}
	}

	const sendConnect = () => {
		const getPlayers = {
			hostname: 'localhost',
			port: 3000,
			path: '/players',
			method: 'GET',
			body: JSON.stringify({
				userID: props.userID
			})
		}
		props.sendRequest(getPlayers, (status, data) => {
			if (status === 200) {
				setPlayers(data.clients);
			}
		})
		const getConnect = {
			hostname: 'localhost',
			port: 3000,
			path: '/connect',
			method: 'GET'
		}
		props.sendRequest(getConnect, (status, data) => {
			if (status === 200)
				connectToWebSocket(data);
		});
	};

	const [players, setPlayers] = useState(null);

	// setInterval(() => {
	// 	const request = {
	// 		hostname: 'localhost',
	// 		port: 3000,
	// 		path: '/players',
	// 		method: 'GET',
	// 		body: JSON.stringify({
	// 			userID: props.userID
	// 		})
	// 	}
	// 	props.sendRequest(request, (status, data) => {
	// 		if (status === 200) {
	// 			setPlayers(data.clients);
	// 		}
	// 	})
	// }, 2 * 1000);

	return (
		<div>
			<h2>Players online: {players === null ? 0 : `${players.length}`} / 6</h2>
			<div className="container">
				<button className="connect-button" onClick={sendConnect}>Connect to WebSocket</button>
			</div>
		</div>
	);
};

export default ConnectComponent;
