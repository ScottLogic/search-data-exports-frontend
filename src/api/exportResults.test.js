import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import executionPoller from '../utilities/executionPoller';
import connectWebsocket from '../utilities/websocket';
import exportResults from './exportResults';

jest.mock('react-toastify');
jest.mock('aws-amplify');
jest.mock('../utilities/executionPoller');
jest.mock('../utilities/websocket');

describe('exportResults API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('throws an error given an unknown export type', async () => {
    expect(exportResults({ selectedType: 'pigeon' })).rejects.toThrow('Unknown export type selected: pigeon');
  });

  describe('directDownload', () => {
    it('calls the execution poller and assigns the resulting link to window.location when the request is successful', async () => {
      const request = {
        selectedType: 'directDownload',
        searchCriteria: {}
      };
      API.post.mockResolvedValue({ executionArn: 'testArn' });
      executionPoller.mockResolvedValue('http://test.com');
      window.location.assign = jest.fn();
      await exportResults(request);
      expect(toast.info).toHaveBeenCalledWith('Download request sent, your download will begin soon.');
      expect(executionPoller).toHaveBeenCalledWith('testArn', 500);
      expect(window.location.assign).toHaveBeenCalledWith('http://test.com');
    });

    it('displays an error if an error occured', async () => {
      const request = {
        selectedType: 'directDownload',
        searchCriteria: {}
      };
      API.post.mockRejectedValue();
      await exportResults(request);
      expect(toast.error).toHaveBeenCalledWith('Something went wrong, please try again.');
    });
  });

  describe('email', () => {
    it('produces an execution ARN and displays a success message when the request is successful', async () => {
      const request = {
        selectedType: 'email',
        searchCriteria: {}
      };
      API.post.mockResolvedValue({ executionArn: 'testArn' });
      await exportResults(request);
      expect(toast.success).toHaveBeenCalledWith('Success! You will shortly receive an email.');
    });

    it('displays an error if an API error occured', async () => {
      const request = {
        selectedType: 'email',
        searchCriteria: {}
      };
      API.post.mockRejectedValue(new Error('network error'));
      await exportResults(request);
      expect(toast.error).toHaveBeenCalledWith('Something went wrong, please try again. Error: network error');
    });

    it('displays an error if the response does not contain an execution ARN', async () => {
      const request = {
        selectedType: 'email',
        searchCriteria: {}
      };
      API.post.mockResolvedValue({ statusText: 'error' });
      await exportResults(request);
      expect(toast.error).toHaveBeenCalledWith('Something went wrong, please try again. error');
    });
  });

  describe('pushNotification', () => {
    it('calls connect web socket and assigns the resulting link to window.location when the request is successful', async () => {
      const request = {
        selectedType: 'pushNotification',
        searchCriteria: {}
      };
      API.post.mockResolvedValue({ executionArn: 'testArn' });
      await exportResults(request);
      expect(toast.info).toHaveBeenCalledWith('Request sent, you will receive a notification with your download shortly.');
      expect(connectWebsocket).toHaveBeenCalledWith({ executionArn: 'testArn' });
    });

    it('displays an error if an error occured', async () => {
      const request = {
        selectedType: 'pushNotification',
        searchCriteria: {}
      };
      API.post.mockRejectedValue();
      await exportResults(request);
      expect(toast.error).toHaveBeenCalledWith('Something went wrong, please try again.');
    });
  });


  // it('makes API calls for both real time and daily subscriptions', async () => {
  //   API.get.mockResolvedValue(['post1', 'post2', 'post3']);
  //   digestSearch()(jest.fn());
  //   expect(API.get).toHaveBeenCalledWith('APIGateway', REALTIME_SUBSCRIPTIONS, {});
  //   expect(API.get).toHaveBeenCalledWith('APIGateway', DIGEST_SUBSCRIPTIONS, {});
  // });

  // it('dispatches the update action function with the retrieved subscriptions when the request is successful', async () => {
  //   const mockDispatch = jest.fn();
  //   const response = ['post1', 'post2', 'post3'];
  //   const expectedActionPayload = response.map(value => ({ value }));
  //   API.get.mockResolvedValue(['post1', 'post2', 'post3']);
  //   await digestSearch()(mockDispatch);
  //   expect(mockDispatch).toHaveBeenCalledTimes(2);
  //   expect(mockDispatch).toHaveBeenCalledWith(updateRealTimeList(expectedActionPayload));
  //   expect(mockDispatch).toHaveBeenCalledWith(updateDigestList(expectedActionPayload));
  // });

  // it('displays an error toast when a request fails', async () => {
  //   const mockDispatch = jest.fn();
  //   const message = 'Something went terribly wrong';
  //   API.get.mockRejectedValue(message);
  //   await digestSearch()(mockDispatch);
  //   expect(toast.error).toHaveBeenCalledTimes(2);
  //   expect(toast.error).toHaveBeenCalledWith('Error in Daily Digest List API: Something went terribly wrong');
  // });
});
