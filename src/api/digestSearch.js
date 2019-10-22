import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DIGEST_SUBSCRIPTIONS, REALTIME_SUBSCRIPTIONS } from '../endpoints';
import { updateDigestList, updateRealTimeList } from '../actions/DigestList';

const getSubscriptions = async (dispatch, endpoint, updateFunc) => {
  API.get('APIGateway', endpoint, {})
    .then(response => dispatch(updateFunc(response.map(value => ({ value })))))
    .catch((error) => {
      toast.error(`Error in Daily Digest List API. ${error}`);
    });
};

export default () => (dispatch) => {
  getSubscriptions(dispatch, REALTIME_SUBSCRIPTIONS, updateRealTimeList);
  getSubscriptions(dispatch, DIGEST_SUBSCRIPTIONS, updateDigestList);
};
