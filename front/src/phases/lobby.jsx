import { useState } from 'preact/hooks';

const LobbyComponent = (props) => {
	const [playerName, setPlayerName] = useState('Kevin')

	const sendReady = () => {
		const request = {
			hostname: 'localhost',
			port: 3000,
			path: '/lobby/ready',
			method: 'POST',
			body: JSON.stringify({ userID: props.userId }),
		};
		props.sendRequest(request, (status, data) => {
			console.log(`status = ${status}`);
			console.log(`data = ${data}`);
		});
	};

	const selectCharacter = () => {
		const request = {
			hostname: 'localhost',
			port: 3000,
			path: '/lobby/selectCharacter',
			method: 'POST',
			body: JSON.stringify({
				characterID: 0,
				characterName: playerName,
				userID: props.userId
			}),
		}
		props.sendRequest(request, (status, data) => {
			console.log(`status = ${status}`);
			console.log(`data = ${data}`);
		});
	};

	return (
		<div>
			<h3>Lobby Component</h3>
			{/* <p>Current Player Name: {playerName}</p>
			<div>
				<h5>Set Player Name:</h5>
				<input
					type="text"
					value={playerName}
					onChange={(e) => setPlayerName(e.target.value)}
					placeholder="Name..."
				/>
			</div> */}
			<button onClick={sendReady}>Get Ready</button>
		</div>
	)
};

export default LobbyComponent;
