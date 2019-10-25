import reducer from './DigestList';
import * as types from '../actions/SubscriptionsList';

describe('SubscriptionsList Reducer', () => {
  const initialState = {
    dailySubscriptionsList: []
  };

  it('Should return the initial state when given an unknown action', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it('Should handle the UPDATE_DAILY_SUBSCRIPTIONS_LIST action', () => {
    const action = {
      type: types.UPDATE_DAILY_SUBSCRIPTIONS_LIST,
      payload: [{ item: 'item' }]
    };

    const updatedState = {
      dailySubscriptionsList: [{ item: 'item' }]
    };

    expect(reducer(initialState, action)).toEqual(updatedState);
  });
});
