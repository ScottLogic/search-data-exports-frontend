import { toast } from 'react-toastify';
import { DOWNLOAD_REQUEST_URL, REPORT_STATUS_URL } from '../endpoints';

const getDownloadRequest = (type, parameters, searchCriteria) => ({
  type,
  parameters,
  searchCriteria
});

const handleDirectDownloadRequest = async (searchCriteria) => {
  let executionArn;

  const request = getDownloadRequest('direct', null, searchCriteria);
  await fetch(DOWNLOAD_REQUEST_URL, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(resultJson => resultJson.json())
    .then((result) => {
      console.log(result);
      toast.info('Download request sent, your download will be available soon.');
      executionArn = result.executionArn;
    })
    .catch((error) => {
      console.error(error);
      toast.error('Something went wrong, please try again.');
    });

  fetch(REPORT_STATUS_URL, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({executionArn}),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(resultJson => resultJson.json())
    .then(result => console.log(result))
    .catch(err => console.error(err));
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
