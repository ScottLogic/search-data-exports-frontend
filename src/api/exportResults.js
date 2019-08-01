import { toast } from 'react-toastify';
import { DOWNLOAD_REQUEST_URL } from '../endpoints';
import executionPoller from '../utilities/executionPoller';
import connectWebsocket from '../utilities/websocket';

const getDownloadRequest = (type, parameters, searchCriteria) => ({
  type,
  parameters,
  searchCriteria
});

const handleDirectDownloadRequest = async (searchCriteria) => {
  const request = getDownloadRequest('direct', null, searchCriteria);
  fetch(DOWNLOAD_REQUEST_URL, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(resultJson => resultJson.json())
    .then((result) => {
      toast.info('Download request sent, your download will begin soon.');
      return executionPoller(result.executionArn, 500);
    })
    .then((downloadLink) => {
      window.location.assign(downloadLink);
    })
    .catch((error) => {
      console.error(error);
      toast.error('Something went wrong, please try again.');
    });
};

const handleEmailRequest = async (searchCriteria, emailAddress) => {
  const request = getDownloadRequest('email', { emailAddress }, searchCriteria);
  const response = await fetch(DOWNLOAD_REQUEST_URL, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) throw Error(response.statusText);
};

const handlePushNotificationRequest = async (searchCriteria) => {
  const request = getDownloadRequest('push', null, searchCriteria);
  fetch(DOWNLOAD_REQUEST_URL, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(resultJson => resultJson.json())
    .then((response) => {
      toast.info('Request sent, you will receive a notification with your download shortly.');
      connectWebsocket(response);
    })
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
