import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DAILY_SUBSCRIPTIONS, REAL_TIME_SUBSCRIPTIONS } from '../endpoints';
import { updateDailySubscriptionsList, updateRealTimeSubscriptionsList } from '../actions/SubscriptionsList';

const getSubscriptions = async (dispatch, endpoint, updateAction) => API.get('APIGateway', endpoint, {})
  .then(response => dispatch(updateAction(response.map(value => ({ value })))))
  .catch((error) => {
    toast.error(`Error in Subscriptions List API: ${error}`);
  });

export default () => async (dispatch) => {
  getSubscriptions(dispatch, REAL_TIME_SUBSCRIPTIONS, updateRealTimeSubscriptionsList);
  getSubscriptions(dispatch, DAILY_SUBSCRIPTIONS, updateDailySubscriptionsList);
};
