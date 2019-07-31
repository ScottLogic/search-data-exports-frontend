import { REPORT_STATUS_URL } from '../endpoints';

export default (executionArn, timeout) => {
  return new Promise((resolve, reject) => {
    (function waitForURL() {
      fetch(REPORT_STATUS_URL, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({executionArn}),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(resultJson => resultJson.json())
        .then((result) => {
          if (result.status === 'RUNNING') {
            setTimeout(waitForURL, timeout);
          } else if (result.status === 'FAILED') {
            return reject('Error with step function execution');
          } else {
            return resolve(result.reportURL);
          }
        })
        .catch((err) => {
          console.error(err);
          return reject(err);
        });
    })();
  });
};
