import { UPDATE_SUBSCRIPTIONS_LIST_MODAL_DISPLAYED } from '../actions/SubscriptionsListModal';

const INITIAL_STATE = {
  modalDisplayed: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SUBSCRIPTIONS_LIST_MODAL_DISPLAYED:
      return {
        modalDisplayed: action.payload
      };
    default:
      return state;
  }
};
