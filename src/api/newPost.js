import { toast } from 'react-toastify';
import { NEW_POST_URL } from '../endpoints';

const buildRequestJSON = inputFields => ({
  UserID: 1,
  Post: inputFields.Post,
  Tags: inputFields.Tags.split(' ').map(tag => `${((tag.charAt(0) !== '#') ? '#' : '')}${tag}`)
});

const newPost = (postData) => {
  const request = buildRequestJSON(postData);
  toast.info('New Post Sent.');
  fetch(NEW_POST_URL, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(resultJson => resultJson.json())
    .then((response) => {
      console.log('response', response);
      toast.success('New Post Successful');
    })
    .catch((error) => {
      console.error(error);
      toast.error('Something went wrong, please try again.');
    });
};

export default (postData) => {
  newPost(postData);
};
