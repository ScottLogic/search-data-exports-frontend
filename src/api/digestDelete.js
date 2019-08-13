import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DIGEST_SUBSCRIPTIONS } from '../endpoints';
import fetchDigestList from './digestSearch';

const deleteDailyDigest = (request) => {
  console.log(request);
  API.delete('APIGateway', DIGEST_SUBSCRIPTIONS, {
    body: request
  })
    .then(() => {
      toast.success('Delete Subscription successful');
      fetchDigestList();
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

export default (request) => {
  console.log('Delete Digest Request:', request);
  switch (request.frequency) {
    case 'Daily':
      deleteDailyDigest(request);
      break;
    default:
      console.warn(`Unknown method passed to delete ${request.frequency}`);
  }
};
