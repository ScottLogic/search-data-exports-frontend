export const UPDATE_DAILY_SUBSCRIPTIONS_LIST = 'UPDATE_DIGEST_LIST';
export const UPDATE_REAL_TIME_SUBSCRIPTIONS_LIST = 'UPDATE_REALTIME_LIST';

export const updateDailySubscriptionsList = digestList => ({
  type: UPDATE_DAILY_SUBSCRIPTIONS_LIST,
  payload: digestList
});

export const updateRealTimeSubscriptionsList = digestList => ({
  type: UPDATE_REAL_TIME_SUBSCRIPTIONS_LIST,
  payload: digestList
});
