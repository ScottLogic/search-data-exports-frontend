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
  const request = getDownloadRequest('direct', searchCriteria);
  toast.info('Download request sent, your download will begin soon.');
  API.post('APIGateway', DOWNLOAD_REQUEST, {
    body: request
  })
    .then(result => executionPoller(result.executionArn, 500))
    .then(downloadLink => window.location.assign(downloadLink))
    .catch((error) => {
      console.error(error);
      toast.error('Something went wrong, please try again.');
    });
};

const handleEmailRequest = async (searchCriteria) => {
  const request = getDownloadRequest('email', searchCriteria);
  const response = await API.post('APIGateway', DOWNLOAD_REQUEST, {
    body: request
  });

  // Because of how the API.post clips off the headers we cannot use response.ok.
  // So we are checking an actual executionARN is replied to confirm it exited correctly.
  if (!response.executionArn) throw Error(response.statusText);
};

const handlePushNotificationRequest = async (searchCriteria) => {
  const request = getDownloadRequest('push', searchCriteria);
  toast.info('Request sent, you will receive a notification with your download shortly.');
  API.post('APIGateway', DOWNLOAD_REQUEST, {
    body: request
  })
    .then(response => connectWebsocket(response))
    .catch((error) => {
      console.error(error);
      toast.error('Something went wrong, please try again.');
    });
};

export default (modalData, lastRequest) => {
  switch (modalData.selectedType) {
    case 'directDownload':
      handleDirectDownloadRequest(lastRequest);
      break;
    case 'email':
      handleEmailRequest(lastRequest, modalData.emailAddress)
        .then(() => toast.success('Success! You will shortly receive an email.'))
        .catch((error) => {
          toast.error('Something went wrong, please try again.');
          console.error(error);
        });
      break;
    case 'pushNotification':
      handlePushNotificationRequest(lastRequest);
      break;
    default:
      break;
  }
};
