import configureMockStore from 'redux-mock-store';
import selectRealTimeSubscriptions from './RealTimeSubscriptionsList';

const mockStore = configureMockStore();

describe('RealTimeSubscriptionsList selector', () => {
  const realTimeSubscriptionsList = [];

  const store = mockStore({
    subscriptionsList: {
      realTimeSubscriptionsList: []
    }
  });

  let state;

  beforeEach(() => {
    state = store.getState();
  });

  it('selectRealTimeSubscriptions should return the users real time subscriptions list', () => {
    expect(selectRealTimeSubscriptions(state)).toEqual(realTimeSubscriptionsList);
  });
});
