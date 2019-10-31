import { API } from 'aws-amplify';
import { mapStateToProps, mapDispatchToProps } from './AppContainer';
import {
  pageUpdated,
  requestUpdated,
  searchResultsReceived,
  isLoadingUpdated
} from '../../actions/App';
import { updateModalDisplayed as showSubscriptionsModal } from '../../actions/SubscriptionsListModal';

jest.mock('react-toastify');
jest.mock('aws-amplify');

describe('<AppContainer />', () => {
  const initialState = {
    app: {
      data: [],
      totalHitsCount: 0,
      maxPages: 1,
      currentPage: 0,
      lastRequest: {},
      isLoading: false
    }
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

  const testRequest = {
    type: 'post',
    results: 10,
    page: 0,
    search: [{ value: 'person' }]
  };

  it('maps state to props', () => {
    const appProps = mapStateToProps(initialState);
    expect(appProps).toEqual({
      data: [],
      maxPages: 1,
      currentPage: 0,
      lastRequest: {},
      isLoading: false
    });
  });

  it('maps dispatch to props and dispatches appropriate actions', async () => {
    const dispatch = jest.fn();
    const appDispatchProps = mapDispatchToProps(dispatch);

    appDispatchProps.setCurrentPage(0);
    appDispatchProps.setLastRequest({});
    appDispatchProps.showSubscriptionsModal();

    API.post.mockResolvedValue(successResults);
    await appDispatchProps.fetchSearchResults(testRequest);

    const expectedDispatchedResults = {
      ...successResults,
      MaxPages: Math.ceil(successResults.TotalResults / testRequest.results)
    };

    expect(dispatch.mock.calls).toEqual([
      [pageUpdated(0)],
      [requestUpdated({})],
      [showSubscriptionsModal(true)],
      [isLoadingUpdated(true)],
      [searchResultsReceived(expectedDispatchedResults)],
      [isLoadingUpdated(false)]
    ]);
  });
});
