import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DAILY_SUBSCRIPTIONS, REAL_TIME_SUBSCRIPTIONS } from '../endpoints';

const sendRequest = async (request, endpoint) => {
  const fieldValues = request.searchCriteria.search[0];
  toast.info('Subscribing to digest.');
  return API.post('APIGateway', endpoint, {
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

export default async (request) => {
  switch (request.frequency) {
    case 'daily':
      sendRequest(request, DAILY_SUBSCRIPTIONS);
      break;
    case 'realTime':
      sendRequest(request, REAL_TIME_SUBSCRIPTIONS);
      break;
    default:
      throw Error(`Unknown method on digest request ${request.frequency}`);
  }
};
