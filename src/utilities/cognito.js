// Config file for cognito stuff (@TODO move to env variables later )
const config = {
  apiGateway: {
    REGION: 'eu-west-1',
    URL: 'https://um2btdnaa8.execute-api.eu-west-1.amazonaws.com/dev'
  },
  cognito: {
    REGION: 'eu-west-1',
    USER_POOL_ID: 'eu-west-1_yN63hou3W',
    APP_CLIENT_ID: '7jtefoatblk8ak6ddf67otob5h',
    IDENTITY_POOL_ID: 'eu-west-1:fb74bd2e-b5f0-44ff-b523-c485c41f0ea6'
  }
};

export default config;
