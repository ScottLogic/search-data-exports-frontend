import reducer from './NewPostModal';
import * as types from '../actions/NewPostModal';

describe('NewPostModal Reducer', () => {
  const initialState = {
    modalDisplayed: false
  };

  it('Should return the initial state when given an unknown action', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it('Should handle the UPDATE_NEW_POST_MODAL_DISPLAYED action', () => {
    const action = {
      type: types.UPDATE_NEW_POST_MODAL_DISPLAYED,
      payload: true
    };

    const updatedState = {
      modalDisplayed: true
    };

    expect(reducer(initialState, action)).toEqual(updatedState);
  });
});
