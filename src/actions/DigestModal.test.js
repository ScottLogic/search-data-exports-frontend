import * as actions from './DigestModal';

describe('DigestModal Actions', () => {
  it('updateModalDisplayed should return the display status in a payload', () => {
    const isDisplayed = true;

    const expectedAction = {
      type: actions.UPDATE_DIGEST_MODAL_DISPLAYED,
      payload: isDisplayed
    };

    expect(actions.updateModalDisplayed(isDisplayed)).toEqual(expectedAction);
  });
});
