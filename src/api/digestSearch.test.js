import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DAILY_SUBSCRIPTIONS, REAL_TIME_SUBSCRIPTIONS } from '../endpoints';
import { updateDailySubscriptionsList, updateRealTimeSubscriptionsList } from '../actions/SubscriptionsList';
import digestSearch from './digestSearch';

jest.mock('react-toastify');
jest.mock('aws-amplify');

describe('digestSearch API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('makes API calls for both real time and daily subscriptions', async () => {
    API.get.mockResolvedValue(['post1', 'post2', 'post3']);
    digestSearch()(jest.fn());
    expect(API.get).toHaveBeenCalledWith('APIGateway', REAL_TIME_SUBSCRIPTIONS, {});
    expect(API.get).toHaveBeenCalledWith('APIGateway', DAILY_SUBSCRIPTIONS, {});
  });

  it('dispatches the update action function with the retrieved subscriptions when the request is successful', async () => {
    const mockDispatch = jest.fn();
    const response = ['post1', 'post2', 'post3'];
    const expectedActionPayload = response.map(value => ({ value }));
    API.get.mockResolvedValue(['post1', 'post2', 'post3']);
    await digestSearch()(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith(updateDailySubscriptionsList(expectedActionPayload));
    expect(mockDispatch).toHaveBeenCalledWith(
      updateRealTimeSubscriptionsList(expectedActionPayload)
    );
  });

  it('displays an error toast when a request fails', async () => {
    const mockDispatch = jest.fn();
    const message = 'Something went terribly wrong';
    API.get.mockRejectedValue(message);
    await digestSearch()(mockDispatch);
    expect(toast.error).toHaveBeenCalledTimes(2);
    expect(toast.error).toHaveBeenCalledWith('Error in Subscriptions List API: Something went terribly wrong');
  });
});
