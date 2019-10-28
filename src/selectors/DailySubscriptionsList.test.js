import configureMockStore from 'redux-mock-store';
import selectDailySubscriptions from './DailySubscriptionsList';

const mockStore = configureMockStore();

describe('DailySubscriptionsList selector', () => {
  const dailySubscriptionsList = [];

  const store = mockStore({
    subscriptionsList: {
      dailySubscriptionsList: []
    }
  });

  let state;

  beforeEach(() => {
    state = store.getState();
  });

  it('selectDailySubscriptions should return the users daily subscriptions list', () => {
    expect(selectDailySubscriptions(state)).toEqual(dailySubscriptionsList);
  });
});
