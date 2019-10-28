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

  it('getDigestList should return the users digest list', () => {
    expect(selectDailySubscriptions(state)).toEqual(dailySubscriptionsList);
  });
});
