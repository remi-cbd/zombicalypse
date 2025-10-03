import useWebSocket from '../hooks/websocket';

const WebSocketComponent = (userID) => {
  const { socket, messages, status, sendMessage } = useWebSocket(`ws://localhost:3000/ws?uuid=${userID}`);

  return (
    <div>
      <h1>WebSocket Status: {status}</h1>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <button onClick={() => sendMessage('Hello from React!')}>Send Message</button>
    </div>
  );
};

export default WebSocketComponent;