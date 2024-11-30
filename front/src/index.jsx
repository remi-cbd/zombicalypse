// import React, { useState } from 'react';

import { render } from 'preact';
import { useState } from 'preact/hooks';
import http from 'http';

import ConnectComponent from './phases/connect';
import LobbyComponent from './phases/lobby';
import GameComponent from './phases/game';

const gamePhase = {
  connect: ConnectComponent,
  lobby: LobbyComponent,
  game: GameComponent
}

function App() {
  const [wsConnection, setWsConnection] = useState(null);
  const [currentPhase, setCurrentPhase] = useState('connect');
  const [userId, setUserId] = useState('');

  const sendRequest = (request, callback) => {
    const req = http.request(request, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { callback(res.statusCode, data); });
    });
    req.on('error', (error) => {
      console.error(`Request failed: ${error.message}`);
    });
    req.end();
  }

  const CurrentComponent = gamePhase[currentPhase];

  // const disconnectFromWebSocket = () => {
  // 	wsConnection.close(1000, 'Closing connection from client');
  // 	setWsConnection(null);
  // 	setServerMessage('');
  // };

  return (
    <div>
      <h1>Zombicalypse 1.0.0</h1>

      {/* <p>Status: {wsConnection === null ? 'Disconnected' : 'Connected' }</p> */}

      {/* <button onClick={disconnectFromWebSocket}>Disconnect from WebSocket</button> */}

      {/* <div>
        <h3>Server Response:</h3>
        <p>{serverMessage}</p>
      </div> */}

      {/* <div>
        <h5>Change Game Phase:</h5>
        <button onClick={() => setCurrentPhase('connect')}>Connect Phase</button>
        <button onClick={() => setCurrentPhase('lobby')}>Lobby Phase</button>
        <button onClick={() => setCurrentPhase('game')}>Game Phase</button>
      </div> */}

      <div>
        <CurrentComponent
          wsConnection={wsConnection}
          setWsConnection={setWsConnection}
          currentPhase={currentPhase}
          setCurrentPhase={setCurrentPhase}
          userId={userId}
          setUserId={setUserId}
          sendRequest={sendRequest}
        />
      </div>
    </div>
  );
}

// export default App;

render(<App />, document.getElementById('app'));
