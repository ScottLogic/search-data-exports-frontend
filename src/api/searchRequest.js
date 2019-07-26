import { searchResultsReceived, isLoadingUpdated } from '../actions/App';
import { SEARCH_REQUEST_URL } from '../endpoints';

export const fetchSearchResults = request => dispatch => {
  dispatch(isLoadingUpdated(true));
  fetch(SEARCH_REQUEST_URL, {       
    method: 'POST',
    mode: 'cors'  ,
    body: JSON.stringify(request) ,       
     headers: {
      "Content-Type" : "application/json",
    } 
  }).then(
    response => response.json()
  ).then(response => {
    const results = {
      ...response,
      MaxPages: Math.ceil(response.TotalResults / request.results)
    };

    dispatch(searchResultsReceived(results));
  }).catch(error => {
    console.log('Error in Search API:', error);

    const results = {
      Results: [],
      TotalResults: 0,
      MaxPages: 1
    };

    dispatch(searchResultsReceived(results));
  }).finally(() => {
    dispatch(isLoadingUpdated(false));
  });
};
