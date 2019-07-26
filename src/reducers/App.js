import * as actions from '../actions/App';

const INITIAL_STATE = {
  data: [],
  totalHitsCount: 0,
  maxPages: 1,
  currentPage: 0,
  lastRequest: {},
  isLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.SEARCH_RESULTS_RECEIVED:
      return {
        ...state,
        data: action.payload.Results,
        totalHitsCount: action.payload.TotalResults,
        maxPages: action.payload.MaxPages
      };
    case actions.PAGE_UPDATED:
      return {
        ...state,
        currentPage: action.payload
      };
    case actions.REQUEST_UPDATED:
      return {
        ...state,
        lastRequest: action.payload
      };
    case actions.IS_LOADING_UPDATED:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};
