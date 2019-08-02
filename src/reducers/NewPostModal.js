import { UPDATE_NEW_POST_MODAL_DISPLAYED } from '../actions/NewPostModal';

const INITIAL_STATE = {
  modalDisplayed: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_NEW_POST_MODAL_DISPLAYED:
      return {
        modalDisplayed: action.payload
      };
    default:
      return state;
  }
};
