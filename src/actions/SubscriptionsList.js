export const UPDATE_DAILY_SUBSCRIPTIONS_LIST = 'UPDATE_DAILY_SUBSCRIPTIONS_LIST';
export const UPDATE_REAL_TIME_SUBSCRIPTIONS_LIST = 'UPDATE_REAL_TIME_LIST';

export const updateDailySubscriptionsList = payload => ({
  type: UPDATE_DAILY_SUBSCRIPTIONS_LIST, payload
});

export const updateRealTimeSubscriptionsList = payload => ({
  type: UPDATE_REAL_TIME_SUBSCRIPTIONS_LIST, payload
});
