import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DIGEST_SUBSCRIPTIONS, REALTIME_SUBSCRIPTIONS } from '../endpoints';

const sendRequest = (request, endpoint) => {
  const fieldValues = request.searchCriteria.search[0];
  toast.info('Subscribing to digest.');
  API.post('APIGateway', endpoint, {
    body: fieldValues
  })
    .then(() => toast.success('Subscription successful'))
    .catch((error) => {
      const errorMessage = (error.response && error.response.data && error.response.data.message) || '';
      if (errorMessage.length > 0) {
        toast.error(errorMessage);
      } else {
        toast.error(`Something went wrong, ${error}.`);
      }
    });
};

export default (request) => {
  switch (request.frequency) {
    case 'daily':
      sendRequest(request, DIGEST_SUBSCRIPTIONS);
      break;
    case 'realTime':
      sendRequest(request, REALTIME_SUBSCRIPTIONS);
      break;
    default:
      throw Error('Unknown method on digest request');
  }
};
