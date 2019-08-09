import { API } from 'aws-amplify';
import { REPORT_STATUS_URL } from '../endpoints';

export default (executionArn, timeout) => new Promise((resolve, reject) => {
  (function waitForURL() {
    API.post('APIGateway', REPORT_STATUS_URL, {
      body: { executionArn }
    })
      // eslint-disable-next-line consistent-return
      .then((result) => {
        if (result.status === 'RUNNING') {
          setTimeout(waitForURL, timeout);
        } else if (result.status === 'FAILED') {
          return reject(Error('Error with step function execution'));
        } else {
          return resolve(result.reportURL);
        }
      })
      .catch((err) => {
        console.error(err);
        return reject(err);
      });
  }());
});
