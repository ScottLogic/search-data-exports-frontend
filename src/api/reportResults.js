import { toast } from 'react-toastify';
import { API } from 'aws-amplify';
import { GRAPHICAL_REQUEST, HYBRID_REQUEST } from '../endpoints';

const emptySearch = {
  search: []
};

const handleDownloadRequest = async (reportURL, searchCriteria, callback) => {
  toast.info(`Request sent, ${(callback) ? 'your image will display shortly.' : 'your download will begin soon.'}`);

  API.post('APIGateway', reportURL, {
    body: {
      ...searchCriteria,
      download: (!callback)
    }
  })
    .then((downloadLink) => {
      if (callback) {
        callback(downloadLink);
      } else {
        window.location.assign(downloadLink);
      }
    })
    .catch((error) => {
      console.error(error);
      toast.error('Something went wrong, please try again.');
    });
};

export default (modalData, callback) => {
  switch (modalData.reportName) {
    case 'PostFreq':
      handleDownloadRequest(GRAPHICAL_REQUEST, emptySearch, callback);
      break;
    case 'Trending':
      handleDownloadRequest(HYBRID_REQUEST, emptySearch, callback);
      break;
    default:
      break;
  }
};
