import configureMockStore from 'redux-mock-store';
import getDigestList from './DigestList';

const mockStore = configureMockStore();

describe('DigestList selectors', () => {
  const userDigestList = [];

  const store = mockStore({
    digestList: {
      userDigestList: []
    }
  });

  let state;

  beforeEach(() => {
    state = store.getState();
  });

  it('getDigestList should return the users digest list', () => {
    expect(getDigestList(state)).toEqual(userDigestList);
  });
});
