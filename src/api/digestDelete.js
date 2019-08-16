import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DIGEST_SUBSCRIPTIONS } from '../endpoints';

const deleteDailyDigest = (request) => {
  API.del('APIGateway', DIGEST_SUBSCRIPTIONS, {
    body: { value: request.value }
  })
    .then(() => toast.success('Delete Subscription successful'))
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

export default async (request) => {
  switch (request.frequency) {
    case 'Daily':
      return deleteDailyDigest(request);
    default:
      console.warn(`Unknown method passed to delete ${request.frequency}`);
      throw Error(`Unknown method passed to delete ${request.frequency}`);
  }
};
