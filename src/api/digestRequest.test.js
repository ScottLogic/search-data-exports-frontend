import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DIGEST_SUBSCRIPTIONS, REALTIME_SUBSCRIPTIONS } from '../endpoints';
import digestRequest from './digestRequest';

jest.mock('react-toastify');
jest.mock('aws-amplify');

describe('digestRequest API', () => {
  const testSearchCriteria = {
    searchCriteria: {
      type: 'post',
      results: 10,
      page: 0,
      search: [
        {
          value: 'test'
        }
      ]
    }
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('throws an error when the frequency is unknown', async () => {
    expect(digestRequest({ frequency: 'Monthly' })).rejects.toThrow(
      'Unknown method on digest request Monthly'
    );
  });

  it('calls sendRequest with the real time endpoint when frequency is real time', async () => {
    API.post.mockResolvedValue();
    const request = { frequency: 'realTime', ...testSearchCriteria };
    digestRequest(request);
    expect(API.post).toHaveBeenCalledWith('APIGateway', REALTIME_SUBSCRIPTIONS, {
      body: { value: 'test' }
    });
  });

  it('calls deleteDigest with the digest endpoint when frequency is daily', async () => {
    API.post.mockResolvedValue();
    const request = { frequency: 'daily', ...testSearchCriteria };
    digestRequest(request);
    expect(API.post).toHaveBeenCalledWith('APIGateway', DIGEST_SUBSCRIPTIONS, {
      body: { value: 'test' }
    });
  });

  it('displays a success toast when the request is successful', async () => {
    API.post.mockResolvedValue();
    await digestRequest({ frequency: 'daily', ...testSearchCriteria });
    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith('Subscription successful');
  });

  it('displays an error toast when the request is successful and an error message is provided', async () => {
    const message = 'Something went terribly wrong';
    API.post.mockRejectedValue({ response: { data: { message } } });
    await digestRequest({ frequency: 'daily', ...testSearchCriteria });
    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith('Something went terribly wrong');
  });

  it('displays an error toast when the request is successful and an error message is not provided', async () => {
    const error = new Error('Test error');
    API.post.mockRejectedValue(error);
    await digestRequest({ frequency: 'daily', ...testSearchCriteria });
    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith(`Something went wrong, ${error}.`);
  });
});