import reducer from './DigestList';
import * as types from '../actions/DigestList';

describe('DigestList Reducer', () => {
  const initialState = {
    userDigestList: []
  };

  it('Should return the initial state when given an unknown action', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it('Should handle the UPDATE_DIGEST_LIST action', () => {
    const action = {
      type: types.UPDATE_DIGEST_LIST,
      payload: [{ item: 'item' }]
    };

    const updatedState = {
      userDigestList: [{ item: 'item' }]
    };

    expect(reducer(initialState, action)).toEqual(updatedState);
  });
});
