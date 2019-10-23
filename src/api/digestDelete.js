import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DIGEST_SUBSCRIPTIONS, REALTIME_SUBSCRIPTIONS } from '../endpoints';

const deleteDigest = async (value, endpoint) => {
  await API.del('APIGateway', endpoint, {
    body: { value }
  })
    .then(() => toast.success('Delete Subscription successful'))
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
    case 'Daily':
      return deleteDigest(request.value, DIGEST_SUBSCRIPTIONS);
    case 'Real Time':
      return deleteDigest(request.value, REALTIME_SUBSCRIPTIONS);
    default:
      throw Error(`Unknown method passed to delete ${request.frequency}`);
  }
};
