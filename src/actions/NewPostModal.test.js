import * as actions from './NewPostModal';

describe('NewPostModal Actions', () => {
  it('updateModalDisplayed should return the display status in a payload', () => {
    const isDisplayed = true;

    const expectedAction = {
      type: actions.UPDATE_NEW_POST_MODAL_DISPLAYED,
      payload: isDisplayed
    };

    expect(actions.updateModalDisplayed(isDisplayed)).toEqual(expectedAction);
  });
});
