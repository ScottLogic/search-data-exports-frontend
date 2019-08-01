import { toast } from 'react-toastify';
import { GRAPHICAL_REQUEST_URL, HYBRID_REQUEST_URL } from '../endpoints';

const emptySearch = {
  search: []
};

const handleDownloadRequest = async (reportURL, searchCriteria) => {  
  toast.info('Download request sent, your download will begin soon.');
  fetch(reportURL, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(searchCriteria),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(resultJson => resultJson.json())
    .then((downloadLink) => {
      window.location.assign(downloadLink.result);
    })
    .catch((error) => {
      console.error(error);
      toast.error('Something went wrong, please try again.');
    });
};

// TODO: Placeholder for handling push notification export requests
// const handlePushNotificationRequest = async searchCriteria => {};

export default (modalData) => {
  console.log(modalData);
  switch (modalData.reportName) {
    case 'PostFreq':
      handleDownloadRequest(GRAPHICAL_REQUEST_URL, emptySearch);
      break;
    case 'Trending':
      handleDownloadRequest(HYBRID_REQUEST_URL, emptySearch);
      break;
    default:
      break;
  }
};
