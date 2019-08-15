import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DIGEST_SUBSCRIPTIONS } from '../endpoints';
import { updateDigestList } from '../actions/DigestList';

export default () => (dispatch) => {
  API.get('APIGateway', DIGEST_SUBSCRIPTIONS, {})
    .then((response) => {
      dispatch(updateDigestList(response.map(value => ({ value }))));
    })
    .catch((error) => {
      console.error('Error in Digest List API:', error);
      toast.error(`Error in Digest List API. ${error}`);
    });
};
