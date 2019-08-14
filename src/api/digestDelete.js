import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DIGEST_SUBSCRIPTIONS } from '../endpoints';

const deleteDailyDigest = (request, callback) => {
  API.del('APIGateway', DIGEST_SUBSCRIPTIONS, {
    body: request
  })
    .then(() => {
      toast.success('Delete Subscription successful');
      callback();
    })
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

export default (request, callback) => {
  switch (request.frequency) {
    case 'Daily':
      deleteDailyDigest(request, callback);
      break;
    default:
      console.warn(`Unknown method passed to delete ${request.frequency}`);
  }
};
