import { toast } from 'react-toastify';
import { API } from 'aws-amplify';
import { GRAPHICAL_REQUEST, HYBRID_REQUEST } from '../endpoints';

const handleDownloadRequest = async (reportURL, callback) => {
  try {
    const downloadLink = await API.post('APIGateway', reportURL, { body: { download: !callback } });
    toast.info(`Request sent, ${(callback) ? 'your image will display shortly.' : 'your download will begin soon.'}`);
    if (callback) {
      callback(downloadLink);
    } else {
      window.location.assign(downloadLink);
    }
  } catch {
    toast.error('Something went wrong, please try again.');
  }
};

export default async (modalData, callback) => {
  switch (modalData.reportName) {
    case 'PostFreq':
      await handleDownloadRequest(GRAPHICAL_REQUEST, callback);
      break;
    case 'Trending':
      await handleDownloadRequest(HYBRID_REQUEST, callback);
      break;
    default:
      throw Error(`Unknown report type selected: ${modalData.reportName}`);
  }
};
