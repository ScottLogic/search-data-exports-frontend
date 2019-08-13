import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DIGEST_SUBSCRIPTIONS } from '../endpoints';

const handleDailyRequest = (request) => {
  const fieldValues = request.searchCriteria.search[0];
  toast.info('Subscribing to digest.');
  API.post('APIGateway', DIGEST_SUBSCRIPTIONS, {
    body: fieldValues
  })
    .then(() => toast.success('Subscription successful'))
    .catch((error) => {
      const errorMessage = (error.response && error.response.data && error.response.data.message) || '';
      if (errorMessage.length > 0) {
        toast.error(errorMessage);
      } else {
        console.error(error);
        toast.error(`Something went wrong, ${error}.`);
      }
    });
};

const handleRealTimeRequest = (request) => {
  console.log('Handle Real Time request', request);
};

export default (request) => {
  switch (request.frequency) {
    case 'daily':
      handleDailyRequest(request);
      break;
    case 'realTime':
      handleRealTimeRequest(request);
      break;
    default:
      console.warn('Unknown method on digest request');
  }
};
