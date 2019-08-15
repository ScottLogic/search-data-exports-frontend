import * as actions from './DigestList';

describe('DigestList Actions', () => {
  it('updateDigestList should return the display status in a payload', () => {
    const digestList = [];

    const expectedAction = {
      type: actions.UPDATE_DIGEST_LIST,
      payload: digestList
    };

    expect(actions.updateDigestList(digestList)).toEqual(expectedAction);
  });
});
