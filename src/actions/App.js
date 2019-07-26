export const SEARCH_RESULTS_RECEIVED = 'SEARCH_RESULTS_RECEIVED';
export const PAGE_UPDATED = 'PAGE_UPDATED';
export const REQUEST_UPDATED = 'REQUEST_UPDATED';
export const IS_LOADING_UPDATED = 'IS_LOADING_UPDATED'; 

export const searchResultsReceived = results => ({
  type: SEARCH_RESULTS_RECEIVED,
  payload: results
});

export const pageUpdated = pageNum => ({
  type: PAGE_UPDATED,
  payload: pageNum
});

export const requestUpdated = request => ({
  type: REQUEST_UPDATED,
  payload: request
});

export const isLoadingUpdated = isLoading => ({
  type: IS_LOADING_UPDATED,
  payload: isLoading
});
