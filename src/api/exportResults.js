import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { DOWNLOAD_REQUEST } from '../endpoints';
import executionPoller from '../utilities/executionPoller';
import connectWebsocket from '../utilities/websocket';

const getDownloadRequest = (type, searchCriteria) => ({
  type,
  searchCriteria
});

const handleDirectDownloadRequest = async (searchCriteria) => {
  const body = getDownloadRequest('direct', searchCriteria);
  try {
    const result = await API.post('APIGateway', DOWNLOAD_REQUEST, { body });
    toast.info('Download request sent, your download will begin soon.');
    const downloadLink = await executionPoller(result.executionArn, 500);
    window.location.assign(downloadLink);
  } catch {
    toast.error('Something went wrong, please try again.');
  }
};

const handleEmailRequest = async (searchCriteria) => {
  const body = getDownloadRequest('email', searchCriteria);
  try {
    const response = await API.post('APIGateway', DOWNLOAD_REQUEST, { body });
    // Because of how the API.post clips off the headers we cannot use response.ok.
    // So we are checking an actual executionARN is replied to confirm it exited correctly.
    if (response.executionArn) {
      toast.success('Success! You will shortly receive an email.');
    } else {
      toast.error(`Something went wrong, please try again. ${response.statusText}`);
    }
  } catch (error) {
    toast.error(`Something went wrong, please try again. ${error}`);
  }
};

const handlePushNotificationRequest = async (searchCriteria) => {
  const request = getDownloadRequest('push', searchCriteria);
  toast.info('Request sent, you will receive a notification with your download shortly.');
  API.post('APIGateway', DOWNLOAD_REQUEST, {
    body: request
  })
    .then(response => connectWebsocket(response))
    .catch(() => {
      toast.error('Something went wrong, please try again.');
    });
};

export default async (modalData, lastRequest) => {
  switch (modalData.selectedType) {
    case 'directDownload':
      await handleDirectDownloadRequest(lastRequest);
      break;
    case 'email':
      await handleEmailRequest(lastRequest);
      break;
    case 'pushNotification':
      await handlePushNotificationRequest(lastRequest);
      break;
    default:
      throw Error(`Unknown export type selected: ${modalData.selectedType}`);
  }
};
