import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { GRAPHICAL_REQUEST, HYBRID_REQUEST } from '../endpoints';
import reportResults from './reportResults';

jest.mock('react-toastify');
jest.mock('aws-amplify');

describe('reportResults API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('throws an error given an unknown report type', async () => {
    expect(reportResults({ reportName: 'fancy' })).rejects.toThrow('Unknown report type selected: fancy');
  });

  it('calls handleDownloadRequest with the GRAPHICAL_REQUEST endpoint when the report name is PostFreq', async () => {
    await reportResults({ reportName: 'PostFreq' }, jest.fn());
    expect(API.post).toHaveBeenCalledWith('APIGateway', GRAPHICAL_REQUEST, { body: { download: false } });
  });

  it('calls handleDownloadRequest with the HYBRID_REQUEST endpoint when the report name is Trending', async () => {
    await reportResults({ reportName: 'Trending' }, jest.fn());
    expect(API.post).toHaveBeenCalledWith('APIGateway', HYBRID_REQUEST, { body: { download: false } });
  });

  it('displays the correct message when a callback is provided and calls it with the download link', async () => {
    API.post.mockResolvedValue('http://yourdownloadlink.com');
    const mockCallback = jest.fn();
    await reportResults({ reportName: 'Trending' }, mockCallback);
    expect(toast.info).toHaveBeenCalledWith('Request sent, your image will display shortly.');
    expect(mockCallback).toHaveBeenCalledWith('http://yourdownloadlink.com');
  });

  it('displays the correct message when a callback is not provided and starts the report download', async () => {
    API.post.mockResolvedValue('http://yourdownloadlink.com');
    window.location.assign = jest.fn();
    await reportResults({ reportName: 'Trending' });
    expect(toast.info).toHaveBeenCalledWith('Request sent, your download will begin soon.');
    expect(window.location.assign).toHaveBeenCalledWith('http://yourdownloadlink.com');
  });

  it('shows an error message if the request failed', async () => {
    API.post.mockRejectedValue();
    await reportResults({ reportName: 'Trending' }, jest.fn());
    expect(toast.error).toHaveBeenCalledWith('Something went wrong, please try again.');
  });
});
