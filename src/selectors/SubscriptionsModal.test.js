import configureMockStore from 'redux-mock-store';
import getModalDisplayed from './SubscriptionsModal';

const mockStore = configureMockStore();

describe('SubscriptionsModal selectors', () => {
  const modalDisplayed = true;

  const store = mockStore({
    subscriptionsModal: {
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
