import * as actions from './SubscriptionsListModal';

describe('SubscriptionsListModal Actions', () => {
  it('updateModalDisplayed should return the display status in a payload', () => {
    const isDisplayed = true;

    const expectedAction = {
      type: actions.UPDATE_SUBSCRIPTIONS_LIST_MODAL_DISPLAYED,
      payload: isDisplayed
    };

    expect(actions.updateModalDisplayed(isDisplayed)).toEqual(expectedAction);
  });
});
