import * as actions from './ReportsModal';

describe('ReportsModal Actions', () => {
  it('updateModalDisplayed should return the display status in a payload', () => {
    const isDisplayed = true;

    const expectedAction = {
      type: actions.UPDATE_REPORTS_MODAL_DISPLAYED,
      payload: isDisplayed
    };

    expect(actions.updateModalDisplayed(isDisplayed)).toEqual(expectedAction);
  });
});
