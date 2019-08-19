import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DIGEST_SUBSCRIPTIONS, REALTIME_SUBSCRIPTIONS } from '../endpoints';

const deleteDigest = async (request, endpoint) => {
  await API.del('APIGateway', endpoint, {
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
      return deleteDigest(request, DIGEST_SUBSCRIPTIONS);
    case 'Real Time':
      return deleteDigest(request, REALTIME_SUBSCRIPTIONS);
    default:
      console.warn(`Unknown method passed to delete ${request.frequency}`);
      throw Error(`Unknown method passed to delete ${request.frequency}`);
  }
};
