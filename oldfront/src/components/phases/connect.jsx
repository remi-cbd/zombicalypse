import { useState } from 'preact/hooks'
import '../../styles/connect.css'

const ConnectComponent = (props) => {

	const sendConnect = () => {
		const getConnect = {
			hostname: 'localhost',
			port: 3000,
			path: '/connect',
			method: 'GET'
		}
		props.sendRequest(getConnect, (status, data) => {
			if (status === 200) {
				props.setUserID(data.userID)
				props.setCurrentPhase('lobby')

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
						setPlayers(data.clients)
					}
				})
			}
		})
	}

	const [players, setPlayers] = useState(null)
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
	// 			setPlayers(data.clients)
	// 		}
	// 	})
	// }, 2 * 1000)

	return (
		<div>
			{/* <h2>Players online: {players === null ? 0 : `${players.length}`} / 6</h2> */}
			<h2>Players online: X / 6</h2>
			<div className="container">
				<button className="connect-button" onClick={sendConnect}>Connect to WebSocket</button>
			</div>
		</div>
	)
}

export default ConnectComponent
