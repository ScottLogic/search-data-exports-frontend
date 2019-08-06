import reducer from './App';
import * as types from '../actions/App';

describe('App Reducer', () => {
  const initialState = {
    data: [],
    totalHitsCount: 0,
    maxPages: 1,
    currentPage: 0,
    lastRequest: {},
    isLoading: false
  };

  it('Should return the initial state when given an unknown action', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  [
    {
      type: types.SEARCH_RESULTS_RECEIVED,
      payload: {
        Results: [{ test: 'Example' }],
        TotalResults: 20,
        MaxPages: 2
      },
      updatedState: {
        ...initialState,
        data: [{ test: 'Example' }],
        totalHitsCount: 20,
        maxPages: 2
      }
    },
    {
      type: types.PAGE_UPDATED,
      payload: 5,
      updatedState: { ...initialState, currentPage: 5 }
    },
    {
      type: types.REQUEST_UPDATED,
      payload: { example: 'Test' },
      updatedState: { ...initialState, lastRequest: { example: 'Test' } }
    },
    {
      type: types.IS_LOADING_UPDATED,
      payload: true,
      updatedState: { ...initialState, isLoading: true }
    }
  ].forEach(({ type, payload, updatedState }) => {
    it(`Should handle the ${type} action`, () => {
      const action = {
        type,
        payload
      };

      expect(reducer(initialState, action)).toEqual(updatedState);
    });
  });
});
