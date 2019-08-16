export const UPDATE_DIGEST_LIST = 'UPDATE_DIGEST_LIST';
export const UPDATE_REALTIME_LIST = 'UPDATE_REALTIME_LIST';

export const updateDigestList = digestList => ({
  type: UPDATE_DIGEST_LIST,
  payload: digestList
});

export const updateRealTimeList = digestList => ({
  type: UPDATE_REALTIME_LIST,
  payload: digestList
});
