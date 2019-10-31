import { toast } from 'react-toastify';
import { WEBSOCKET_ENDPOINT } from '../endpoints';

const showDownloadNotification = (reportURL) => {
  toast.success('Your download will begin shortly.');
  window.location.assign(reportURL);
};

export default ({ executionArn, taskToken }) => {
  const socket = new WebSocket(WEBSOCKET_ENDPOINT);
  socket.onopen = () => {
    const payload = {
      action: 'OpenConnection',
      executionArn,
      taskToken
    };
    socket.send(JSON.stringify(payload));
  };

  socket.onmessage = (msg) => {
    try {
      const data = JSON.parse(msg.data);
      showDownloadNotification(data.data.reportURL);
      socket.close();
    } catch (error) {
      toast.error(`Error from websocket: ${error}`);
    }
  };
};
