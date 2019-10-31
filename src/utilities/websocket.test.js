import { toast } from 'react-toastify';
import WS from 'jest-websocket-mock';
import connectWebsocket from './websocket';
import * as endpoints from '../endpoints';

jest.mock('react-toastify');

describe('Connect Websocket Utility', () => {
  const wsTestEndpoint = 'ws://localhost:1234';
  const executionArn = 'executionArn';
  const taskToken = 'taskToken';
  const originalWsEndpoint = endpoints.WEBSOCKET_ENDPOINT;
  let server;

  beforeEach(() => {
    endpoints.WEBSOCKET_ENDPOINT = wsTestEndpoint;
    server = new WS(wsTestEndpoint, { jsonProtocol: true });
  });

  afterEach(() => {
    jest.clearAllMocks();
    WS.clean();
    endpoints.WEBSOCKET_ENDPOINT = originalWsEndpoint;
  });

  it('on connection send the payload to the AWS lambda', async () => {
    connectWebsocket({ executionArn, taskToken });
    await server.connected;
    await expect(server).toReceiveMessage({
      action: 'OpenConnection',
      executionArn,
      taskToken
    });
  });

  it('on message received with reportURL show the success notification and begin download', async () => {
    window.location.assign = jest.fn();
    connectWebsocket({ executionArn, taskToken });
    await server.connected;
    await server.send({ data: { reportURL: 'yourdownload.com' } });
    expect(toast.success).toHaveBeenCalledWith('Your download will begin shortly.');
    expect(window.location.assign).toHaveBeenCalledWith('yourdownload.com');
  });

  it('on message received without reportURL throw an error', async () => {
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      throw Error('Something bad has happened');
    });
    connectWebsocket({ executionArn, taskToken });
    await server.connected;
    await server.send({ data: { reportURL: 'yourdownload.com' } });
    expect(toast.error).toHaveBeenCalledWith('Error from websocket: Error: Something bad has happened');
  });
});
