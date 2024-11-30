import http from 'http';

const ConnectComponent = (props) => {
	const handleRequest = (req) => {
		console.log('Received message from server:', req);
		if (req.id === 1) {

		}
	}

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
			props.setUserId(data);
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

	const options = {
		hostname: 'localhost',
		port: 3000,
		path: '/connect',
		method: 'GET'
	};
	const sendConnect = () => {
		const req = http.request(options, (res) => {
			let data = '';
			res.on('data', (chunk) => { data += chunk; });
			res.on('end', () => { if (res.statusCode === 200) connectToWebSocket(data); });
		});
		req.on('error', (error) => {
			console.error(`Request failed: ${error.message}`);
		});
		req.end();
	};

	return (
		<div>
			<h3>Connect component</h3>
			<div>
				<button onClick={sendConnect}>Connect to WebSocket</button>
			</div>
		</div>
	);
};

export default ConnectComponent;
