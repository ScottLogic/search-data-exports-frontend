import { API } from 'aws-amplify';
import { searchResultsReceived, isLoadingUpdated } from '../actions/App';
import { SEARCH_REQUEST_URL } from '../endpoints';

export default request => (dispatch) => {
  dispatch(isLoadingUpdated(true));

  API.post('APIGateway', SEARCH_REQUEST_URL, {
    body: request
  })
    .then((response) => {
      const results = {
        ...response,
        MaxPages: Math.ceil(response.TotalResults / request.results)
      };

      dispatch(searchResultsReceived(results));
    })
    .catch((error) => {
      console.error('Error in Search API:', error);

      const results = {
        Results: [],
        TotalResults: 0,
        MaxPages: 1
      };

      dispatch(searchResultsReceived(results));
    })
    .finally(() => {
      dispatch(isLoadingUpdated(false));
    });
};
