import * as actions from './App';

describe('App Actions', () => {
  it('searchResultsReceived should return the results in a payload', () => {
    const results = [
      {
        uuid: 1,
        UserID: 1,
        LastName: 'Test',
        FirstName: 'Test',
        EmailAddress: 'test1@example.com'
      }
    ];

    const expectedAction = {
      type: actions.SEARCH_RESULTS_RECEIVED,
      payload: results
    };

    expect(actions.searchResultsReceived(results)).toEqual(expectedAction);
  });

  it('pageUpdated should return the new page number in a payload', () => {
    const pageNum = 50;

    const expectedAction = {
      type: actions.PAGE_UPDATED,
      payload: pageNum
    };

    expect(actions.pageUpdated(pageNum)).toEqual(expectedAction);
  });

  it('requestUpdated should return the request in a payload', () => {
    const request = {
      type: 'post',
      results: 20,
      page: 1,
      search: [{ value: 'Test' }]
    };

    const expectedAction = {
      type: actions.REQUEST_UPDATED,
      payload: request
    };

    expect(actions.requestUpdated(request)).toEqual(expectedAction);
  });

  it('isLoadingUpdated should return loading status in a payload', () => {
    const isLoading = true;

    const expectedAction = {
      type: actions.IS_LOADING_UPDATED,
      payload: isLoading
    };

    expect(actions.isLoadingUpdated(isLoading)).toEqual(expectedAction);
  });
});
