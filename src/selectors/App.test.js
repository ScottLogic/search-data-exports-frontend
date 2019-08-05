import configureMockStore from 'redux-mock-store';
import * as selectors from './App';

const mockStore = configureMockStore();

describe('App Selectors', () => {
  const data = [{ test: 'Example' }];
  const totalHitsCount = 100;
  const maxPages = 10;
  const currentPage = 2;
  const lastRequest = { example: 'Test' };
  const isLoading = false;

  const store = mockStore({
    app: {
      data,
      totalHitsCount,
      maxPages,
      currentPage,
      lastRequest,
      isLoading
    }
  });

  let state;

  beforeEach(() => {
    state = store.getState();
  });

  it('getData should return the stored search response data', () => {
    expect(selectors.getData(state)).toEqual(data);
  });

  it('getTotalHitsCount should return the stored total hits count value', () => {
    expect(selectors.getTotalHitsCount(state)).toEqual(totalHitsCount);
  });

  it('getMaxPages should return the stored max pages value', () => {
    expect(selectors.getMaxPages(state)).toEqual(maxPages);
  });

  it('getCurrentPage should return the stored current page value', () => {
    expect(selectors.getCurrentPage(state)).toEqual(currentPage);
  });

  it('getLastRequest should return the stored last request object', () => {
    expect(selectors.getLastRequest(state)).toEqual(lastRequest);
  });

  it('getIsLoading should return the stored loading state', () => {
    expect(selectors.getIsLoading(state)).toEqual(isLoading);
  });
});
