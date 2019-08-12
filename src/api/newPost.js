import { API } from 'aws-amplify';
import { toast } from 'react-toastify';
import { NEW_POST } from '../endpoints';

const buildRequestJSON = inputFields => ({
  UserID: 1,
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
    .catch((error) => {
      console.error(error);
      toast.error('Something went wrong, please try again.');
    });
};
