import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import './style.css';

export function App() {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));


/*
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function() {
    console.log('Connected to server');
    // Send a message to the server
    socket.send(JSON.stringify({ message: 'Hello, Server!' }));
};

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log('Received from server:', data);
};

socket.onclose = function() {
    console.log('Disconnected from server');
};
*/
