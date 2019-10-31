import { withAuthenticator } from 'aws-amplify-react';
import AppContainer from './AppContainer';

export default withAuthenticator(AppContainer, {
  usernameAttributes: 'email',
  includeGreetings: false,
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
});
