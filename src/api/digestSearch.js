import { API } from 'aws-amplify';
import { DIGEST } from '../endpoints';
import { updateDigestList } from '../actions/DigestList';

export default () => {
  console.log('Doing a search');

    // Call the API
    API.get('APIGateway', DIGEST, {      
    })
    .then((response) => {
      console.log(response);
      updateDigestList(response);
    })
    .catch((error) => {
      console.error('Error in Digest List API:', error);
    })
    .finally(() => {
      console.log('Digest Result Finally. ');
    });

    // get the result

    // throw to the reducer

    // let that handle the rest. 

};
