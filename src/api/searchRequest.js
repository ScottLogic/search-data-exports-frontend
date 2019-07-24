import { searchResultsReceived } from '../actions/App';

export const fetchSearchResults = request => dispatch => {
  fetch(`${process.env.REACT_APP_API_URL ||''}/search/`, {       
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
      MaxPages: 0
    };

    dispatch(searchResultsReceived(results));
  });
};
