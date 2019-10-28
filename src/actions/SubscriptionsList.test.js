import * as actions from './SubscriptionsList';

describe('SubscriptionsList Actions', () => {
  it('updateDailySubscriptionsList should return the display status in a payload', () => {
    const dailySubscriptionsList = [];

    const expectedAction = {
      type: actions.UPDATE_DAILY_SUBSCRIPTIONS_LIST,
      payload: dailySubscriptionsList
    };

    expect(actions.updateDailySubscriptionsList(dailySubscriptionsList)).toEqual(expectedAction);
  });
});
