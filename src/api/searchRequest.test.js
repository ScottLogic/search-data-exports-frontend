import { API } from 'aws-amplify';
import searchRequest from './searchRequest';
import { isLoadingUpdated, searchResultsReceived } from '../actions/App';

jest.mock('react-toastify');
jest.mock('aws-amplify');

describe('searchRequest API', () => {
  const testRequest = {
    type: 'post',
    results: 10,
    page: 0,
    search: [{ value: 'person' }]
  };

  const errorResults = {
    Results: [],
    TotalResults: 0,
    MaxPages: 1
  };

  const successResults = {
    Status: 'ok',
    ErrorMessage: '',
    TotalResults: 95,
    ResultsCount: 10,
    Results: [
      {
        uuid: 'LcpY0mwBntX9HY5LyTgF',
        Type: 'posts',
        UserID: '29139744699797143213',
        DateCreated: '2019-08-25T00:31:59.96Z',
        Content: 'We all need help sometimes; offer someone a helping hand',
        Tags: ['#contact', '#create', '#person']
      },
      {
        uuid: '6MpY0mwBntX9HY5LyTgG',
        Type: 'posts',
        UserID: '29139744699797143213',
        DateCreated: '2019-08-25T00:21:51.772Z',
        Content: 'I checked to make sure that he was still alive.',
        Tags: ['#elaborate', '#bacon', '#person', '#departure']
      }
    ]
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches the IS_LOADING_UPDATED actions when called', async () => {
    API.post.mockResolvedValue();
    const mockDispatch = jest.fn();
    await searchRequest(testRequest)(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(mockDispatch).toHaveBeenCalledWith(isLoadingUpdated(true));
    expect(mockDispatch).toHaveBeenCalledWith(isLoadingUpdated(false));
    expect(mockDispatch).toHaveBeenCalledWith(searchResultsReceived(errorResults));
  });

  it('dispatches the results when the search is successful', async () => {
    API.post.mockResolvedValue(successResults);
    const mockDispatch = jest.fn();
    const expectedDispatchedResults = {
      ...successResults,
      MaxPages: Math.ceil(successResults.TotalResults / testRequest.results)
    };
    await searchRequest(testRequest)(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(mockDispatch).toHaveBeenCalledWith(isLoadingUpdated(true));
    expect(mockDispatch).toHaveBeenCalledWith(searchResultsReceived(expectedDispatchedResults));
    expect(mockDispatch).toHaveBeenCalledWith(isLoadingUpdated(false));
  });

  it('dispatches empty results when the search has failed', async () => {
    API.post.mockRejectedValue(successResults);
    const mockDispatch = jest.fn();
    await searchRequest(testRequest)(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(mockDispatch).toHaveBeenCalledWith(isLoadingUpdated(true));
    expect(mockDispatch).toHaveBeenCalledWith(searchResultsReceived(errorResults));
    expect(mockDispatch).toHaveBeenCalledWith(isLoadingUpdated(false));
  });
});
