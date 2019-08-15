import { UPDATE_DIGEST_LIST } from '../actions/DigestList';

const INITIAL_STATE = {
  userDigestList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_DIGEST_LIST:
      return {
        userDigestList: action.payload
      };
    default:
      return state;
  }
};
