import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import newPost from './newPost';

jest.mock('react-toastify');
jest.mock('aws-amplify');

describe('newPost API', () => {
  const testPost = {
    Post: 'a post',
    Tags: 'some hash tags'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays a success toast when the request is successful', async () => {
    API.post.mockResolvedValue();
    await newPost(testPost);

    expect(toast.info).toHaveBeenCalledTimes(1);
    expect(toast.info).toHaveBeenCalledWith('New Post Sent.');

    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.success).toHaveBeenCalledWith('New Post Successful');
  });

  it('displays an error toast when the request fails', async () => {
    API.post.mockRejectedValue();
    await newPost(testPost);

    expect(toast.info).toHaveBeenCalledTimes(1);
    expect(toast.info).toHaveBeenCalledWith('New Post Sent.');

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith('Something went wrong, please try again.');
  });
});
