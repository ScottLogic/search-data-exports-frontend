import { DISPLAY_EXPORT_RESULTS_MODAL_UPDATED } from '../actions/ExportResultsModal';

const INITIAL_STATE = {
  modalDisplayed: false
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case DISPLAY_EXPORT_RESULTS_MODAL_UPDATED:
      return {
        modalDisplayed: action.payload
      };
    default:
      return state;
  };
};
