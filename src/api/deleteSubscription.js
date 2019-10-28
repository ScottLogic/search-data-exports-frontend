import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DAILY_SUBSCRIPTIONS, REAL_TIME_SUBSCRIPTIONS } from '../endpoints';

const deleteSubscription = async (value, endpoint) => {
  try {
    await API.del('APIGateway', endpoint, { body: { value } });
    toast.success('Delete Subscription successful');
  } catch (error) {
    const errorMessage = (error.response && error.response.data && error.response.data.message) || '';
    if (errorMessage.length > 0) {
      toast.error(errorMessage);
    } else {
      toast.error(`Something went wrong, ${error}.`);
    }
  }
};

export default async (request) => {
  switch (request.frequency) {
    case 'Daily':
      await deleteSubscription(request.value, DAILY_SUBSCRIPTIONS);
      break;
    case 'Real Time':
      await deleteSubscription(request.value, REAL_TIME_SUBSCRIPTIONS);
      break;
    default:
      throw Error(`Unknown method passed to delete: ${request.frequency}`);
  }
};
