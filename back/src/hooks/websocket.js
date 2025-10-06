// import { useState, useEffect, useCallback } from 'react';

// const useWebSocket = (url) => {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [status, setStatus] = useState('Disconnected');

//   useEffect(() => {
//     const ws = new WebSocket(url);

//     ws.onopen = () => {
//       setStatus('Connected');
//     };

//     ws.onmessage = (event) => {
//       setMessages((prevMessages) => [...prevMessages, event.data]);
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//       setStatus('Error');
//     };

//     ws.onclose = () => {
//       setStatus('Disconnected');
//     };

//     setSocket(ws);

//     return () => {
//       ws.close();
//     };
//   }, [url]);

//   const sendMessage = useCallback((message) => {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(message);
//     }
//   }, [socket]);

//   return { socket, messages, status, sendMessage };
// };

// export default useWebSocket;
