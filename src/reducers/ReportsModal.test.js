import reducer from './ReportsModal';
import * as types from '../actions/ReportsModal';

describe('ReportsModal Reducer', () => {
  const initialState = {
    modalDisplayed: false
  };

  it('Should return the initial state when given an unknown action', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it('Should handle the UPDATE_REPORTS_MODAL_DISPLAYED action', () => {
    const action = {
      type: types.UPDATE_REPORTS_MODAL_DISPLAYED,
      payload: true
    };

    const updatedState = {
      modalDisplayed: true
    };

    expect(reducer(initialState, action)).toEqual(updatedState);
  });
});
