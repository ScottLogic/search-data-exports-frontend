import { UPDATE_DAILY_SUBSCRIPTIONS_LIST, UPDATE_REAL_TIME_SUBSCRIPTIONS_LIST } from '../actions/SubscriptionsList';

const INITIAL_STATE = {
  dailySubscriptionsList: [],
  realTimeSubscriptionsList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_DAILY_SUBSCRIPTIONS_LIST:
      return {
        ...state,
        dailySubscriptionsList: action.payload
      };
    case UPDATE_REAL_TIME_SUBSCRIPTIONS_LIST:
      return {
        ...state,
        realTimeSubscriptionsList: action.payload
      };
    default:
      return state;
  }
};
