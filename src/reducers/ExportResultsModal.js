import { UPDATE_RESULTS_MODAL_DISPLAYED } from '../actions/ExportResultsModal';

const INITIAL_STATE = {
  modalDisplayed: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_RESULTS_MODAL_DISPLAYED:
      return {
        modalDisplayed: action.payload
      };
    default:
      return state;
  }
};
