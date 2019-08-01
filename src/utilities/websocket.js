import { toast } from 'react-toastify';
import { WEBSOCKET_ENDPOINT } from '../endpoints';

export default ({ executionArn, taskToken }) => {
  const socket = new WebSocket(WEBSOCKET_ENDPOINT);
  socket.onopen = () => {
    console.log('Socket Connected');
    const payload = {
      action: 'OpenConnection',
      executionArn,
      taskToken
    };
    socket.send(JSON.stringify(payload));
  };

  socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (data.reportURL) {
      showDownloadNotification(data.reportURL);
    } else {
      console.error('Received unexpected message from websocket');
    }
  };

  socket.onclose = () => {
    console.log('Socket Disconnected');
  };
};

const showDownloadNotification = (reportURL) => {
  const options = {
    autoClose: false,
    onClose: () => window.location.assign(reportURL)
  };
  
  toast.success('Click here to download your file.', options);
};
