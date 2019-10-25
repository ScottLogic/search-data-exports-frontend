import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DIGEST_SUBSCRIPTIONS, REALTIME_SUBSCRIPTIONS } from '../endpoints';
import digestDelete from './digestDelete';

jest.mock('react-toastify');
jest.mock('aws-amplify');

describe('digestDelete API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('throws an error when the frequency is unknown', async () => {
    expect(digestDelete({ frequency: 'Monthly' })).rejects.toThrow('Unknown method passed to delete Monthly');
  });

  it('calls deleteDigest with the real time endpoint when frequency is real time', async () => {
    API.del.mockResolvedValue();
    digestDelete({ frequency: 'Real Time', value: 'test' });
    expect(API.del).toHaveBeenCalledWith('APIGateway', REALTIME_SUBSCRIPTIONS, { body: { value: 'test' } });
  });

  it('calls deleteDigest with the digest endpoint when frequency is daily', async () => {
    API.del.mockResolvedValue();
    digestDelete({ frequency: 'Daily', value: 'test' });
    expect(API.del).toHaveBeenCalledWith('APIGateway', DIGEST_SUBSCRIPTIONS, { body: { value: 'test' } });
  });

  it('displays a success toast when the delete request is successful', async () => {
    API.del.mockResolvedValue();
    await digestDelete({ frequency: 'Daily', value: 'test' });
    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith('Delete Subscription successful');
  });

  it('displays an error toast when the delete request is successful and an error message is provided', async () => {
    const message = 'Something went terribly wrong';
    API.del.mockRejectedValue({ response: { data: { message } } });
    await digestDelete({ frequency: 'Daily', value: 'test' });
    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith('Something went terribly wrong');
  });

  it('displays an error toast when the delete request is successful and an error message is not provided', async () => {
    const error = new Error('Test error');
    API.del.mockRejectedValue(error);
    await digestDelete({ frequency: 'Daily', value: 'test' });
    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith(`Something went wrong, ${error}.`);
  });
});
