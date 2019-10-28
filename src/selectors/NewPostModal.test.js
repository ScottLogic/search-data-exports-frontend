import configureMockStore from 'redux-mock-store';
import getModalDisplayed from './NewPostModal';

const mockStore = configureMockStore();

describe('NewPostModal selectors', () => {
  const modalDisplayed = true;

  const store = mockStore({
    newPostModal: {
      modalDisplayed
    }
  });

  let state;

  beforeEach(() => {
    state = store.getState();
  });

  it('getModalDisplayed should return the display status of the modal', () => {
    expect(getModalDisplayed(state)).toEqual(modalDisplayed);
  });
});
