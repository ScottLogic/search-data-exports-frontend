import * as actions from './ExportResultsModal';

describe('ExportResultsModal Actions', () => {
  it('updateModalDisplayed should return the display status in a payload', () => {
    const isDisplayed = true;

    const expectedAction = {
      type: actions.UPDATE_RESULTS_MODAL_DISPLAYED,
      payload: isDisplayed
    };

    expect(actions.updateModalDisplayed(isDisplayed)).toEqual(expectedAction);
  });
});
