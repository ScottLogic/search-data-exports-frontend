import configureMockStore from 'redux-mock-store';
import getModalDisplayed from './SubscriptionsListModal';

const mockStore = configureMockStore();

describe('SubscriptionsListModal selectors', () => {
  const modalDisplayed = true;

  const store = mockStore({
    subscriptionsListModal: {
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
