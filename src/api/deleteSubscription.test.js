import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DAILY_SUBSCRIPTIONS, REAL_TIME_SUBSCRIPTIONS } from '../endpoints';
import deleteSubscription from './deleteSubscription';

jest.mock('react-toastify');
jest.mock('aws-amplify');

describe('deleteSubscription API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('throws an error when the frequency is unknown', async () => {
    expect(deleteSubscription({ frequency: 'Monthly' })).rejects.toThrow('Unknown method passed to delete: Monthly');
  });

  it('calls deleteSubscription with the real time subscriptions endpoint when frequency is real time', async () => {
    API.del.mockResolvedValue();
    deleteSubscription({ frequency: 'Real Time', value: 'test' });
    expect(API.del).toHaveBeenCalledWith('APIGateway', REAL_TIME_SUBSCRIPTIONS, { body: { value: 'test' } });
  });

  it('calls deleteSubscription with the daily subscriptions endpoint when frequency is daily', async () => {
    API.del.mockResolvedValue();
    deleteSubscription({ frequency: 'Daily', value: 'test' });
    expect(API.del).toHaveBeenCalledWith('APIGateway', DAILY_SUBSCRIPTIONS, { body: { value: 'test' } });
  });

  it('displays a success toast when the delete request is successful', async () => {
    API.del.mockResolvedValue();
    await deleteSubscription({ frequency: 'Daily', value: 'test' });
    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith('Delete Subscription successful');
  });

  it('displays an error toast when the delete request is successful and an error message is provided', async () => {
    const message = 'Something went terribly wrong';
    API.del.mockRejectedValue({ response: { data: { message } } });
    await deleteSubscription({ frequency: 'Daily', value: 'test' });
    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith('Something went terribly wrong');
  });

  it('displays an error toast when the delete request is successful and an error message is not provided', async () => {
    const error = new Error('Test error');
    API.del.mockRejectedValue(error);
    await deleteSubscription({ frequency: 'Daily', value: 'test' });
    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith(`Something went wrong, ${error}.`);
  });
});
