import { UPDATE_DIGEST_LIST, UPDATE_REALTIME_LIST } from '../actions/DigestList';

const INITIAL_STATE = {
  userDigestList: [],
  realtimeDigestList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_DIGEST_LIST:
      return {
        ...state,
        userDigestList: action.payload
      };
    case UPDATE_REALTIME_LIST:
      return {
        ...state,
        realtimeDigestList: action.payload
      };
    default:
      return state;
  }
};
