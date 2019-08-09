import { Auth } from 'aws-amplify';

export default {
  Auth: {
    region: `${process.env.REACT_APP_AUTH_REGION || ''}`,
    userPoolId: `${process.env.REACT_APP_AUTH_USER_POOL || ''}`,
    userPoolWebClientId: `${process.env.REACT_APP_AUTH_CLIENT || ''}`,
    identityPoolId: `${process.env.REACT_APP_AUTH_IDENT || ''}`
  },
  API: {
    endpoints: [
      {
        name: 'APIGateway',
        endpoint: `${process.env.REACT_APP_API_URL || ''}`,
        custom_header: async () => ({
          Authorization: (await Auth.currentSession()).idToken.jwtToken
        })
      }
    ]
  }
};
