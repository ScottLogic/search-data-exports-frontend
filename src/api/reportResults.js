import { toast } from 'react-toastify';
import { API } from 'aws-amplify';
import { GRAPHICAL_REQUEST, HYBRID_REQUEST } from '../endpoints';

const emptySearch = {
  search: []
};

const handleDownloadRequest = async (reportURL, searchCriteria) => {
  toast.info('Download request sent, your download will begin soon.');

  API.post('APIGateway', reportURL, {
    body: searchCriteria
  })
    .then((downloadLink) => {
      window.location.assign(downloadLink.result);
    })
    .catch((error) => {
      console.error(error);
      toast.error('Something went wrong, please try again.');
    });
};

export default (modalData) => {
  switch (modalData.reportName) {
    case 'PostFreq':
      handleDownloadRequest(GRAPHICAL_REQUEST, emptySearch);
      break;
    case 'Trending':
      handleDownloadRequest(HYBRID_REQUEST, emptySearch);
      break;
    default:
      break;
  }
};
