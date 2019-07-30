import { toast } from 'react-toastify';
import { DOWNLOAD_REQUEST_URL } from '../endpoints';

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
    .then(result => result.json())
    .then((resultJson) => {
      console.log(resultJson);
      toast.info('Download request sent, your download will be available soon.');
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

// TODO: Placeholder for handling push notification export requests
// const handlePushNotificationRequest = async searchCriteria => {};

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
      // handlePushNotificationRequest();
      break;
    default:
      break;
  }
};
