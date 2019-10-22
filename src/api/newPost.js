import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { NEW_POST } from '../endpoints';

const buildRequestJSON = inputFields => ({
  Post: inputFields.Post,
  Tags: inputFields.Tags.split(' ').map(tag => `${((tag.charAt(0) !== '#') ? '#' : '')}${tag}`)
});

export default (postData) => {
  const request = buildRequestJSON(postData);
  toast.info('New Post Sent.');
  API.post('APIGateway', NEW_POST, {
    body: request
  })
    .then(() => toast.success('New Post Successful'))
    .catch(() => {
      toast.error('Something went wrong, please try again.');
    });
};
