import { UPDATE_DIGEST_LIST_MODAL_DISPLAYED } from '../actions/DigestListModal';

const INITIAL_STATE = {
  modalDisplayed: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_DIGEST_LIST_MODAL_DISPLAYED:
      return {
        modalDisplayed: action.payload
      };
    default:
      return state;
  }
};
