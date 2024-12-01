import { useState } from 'preact/hooks';

import '../styles/lobby.css'

const LobbyComponent = (props) => {
	const sendReady = () => {
		const request = {
			hostname: 'localhost',
			port: 3000,
			path: '/lobby/ready',
			method: 'POST',
			body: JSON.stringify({ userID: props.userID }),
		};
		props.sendRequest(request, (status, data) => {
			console.log(`status = ${status}`);
			console.log(`data = ${data}`);
		});
	};

	// const selectCharacter = () => {
	// 	const request = {
	// 		hostname: 'localhost',
	// 		port: 3000,
	// 		path: '/lobby/selectCharacter',
	// 		method: 'POST',
	// 		body: JSON.stringify({
	// 			characterID: 0,
	// 			characterName: playerName,
	// 			userID: props.userID
	// 		}),
	// 	}
	// 	props.sendRequest(request, (status, data) => {
	// 		console.log(`status = ${status}`);
	// 		console.log(`data = ${data}`);
	// 	});
	// };

	const [selected, setSelected] = useState([false, false, false, false, false, false]);

	const handleClick = (index) => {
		const newSelected = [...selected];
		newSelected[index] = !newSelected[index];
		setSelected(newSelected);
	};

	const [players, setPlayers] = useState(null);
	const request = {
		hostname: 'localhost',
		port: 3000,
		path: '/players',
		method: 'GET',
		body: JSON.stringify({
			userID: props.userID
		})
	}
	props.sendRequest(request, (status, data) => {
		if (status === 200) {
			setPlayers(data.clients);
		}
	})

	return (
		<div>
			{/* Main container for list and grid */}
			<div className="playerlistcontainer">
				{/* Fixed column for player names */}
				<div className="fixed-column">
					<ul>
						{players.map((userID, index) => (
							<li key={index}>{userID}</li>
						))}
					</ul>
				</div>

				{/* Grid for characters */}
				<div className="grid">
					{Array.from({ length: 6 }).map((_, index) => (
						<div key={index} className="character">
							<img
								src={`https://picsum.photos/200`}
								alt={`Character ${index + 1}`}
								className={`character-image ${selected[index] ? 'selected' : ''}`}
								onClick={() => handleClick(index)}
							/>
							<input
								type="text"
								className="name-input"
								placeholder="Select Name..."
							/>
						</div>
					))}
				</div>
			</div>

			{/* Button to trigger ready state */}
			<button onClick={sendReady}>Get Ready</button>
		</div>
	);
};

export default LobbyComponent;
