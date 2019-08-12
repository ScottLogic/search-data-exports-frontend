import { UPDATE_DIGEST_LIST } from '../actions/DigestList';

const INITIAL_STATE = {
  digestList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_DIGEST_LIST:
      return {
        digestList: action.payload
      };
    default:
      return state;
  }
};
