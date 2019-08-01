import { WEBSOCKET_ENDPOINT } from '../endpoints';

export default ({ executionArn, taskToken }) => {
  const socket = new WebSocket(WEBSOCKET_ENDPOINT);
  socket.onopen = () => {
    console.log('Socket Connected');
    const payload = {
      action: 'OpenConnection',
      taskToken,
      executionArn
    };
    socket.send(JSON.stringify(payload));
  };

  socket.onmessage = (msg) => {
    console.log('Message Received:', msg);
  };

  socket.onclose = () => {
    console.log('Socket Disconnected');
  };
};
