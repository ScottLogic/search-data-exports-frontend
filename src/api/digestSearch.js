import { API } from 'aws-amplify';
import { DIGEST } from '../endpoints';
import { updateDigestList } from '../actions/DigestList';

export default () => (dispatch) => {
  API.get('APIGateway', DIGEST, {})
    .then((response) => {
      dispatch(updateDigestList(response));
    })
    .catch((error) => {
      console.error('Error in Digest List API:', error);
    });
};
