import configureMockStore from 'redux-mock-store';
import getModalDisplayed from './ExportResultsModal';

const mockStore = configureMockStore();

describe('ExportResultsModal selectors', () => {
  const modalDisplayed = true;

  const store = mockStore({
    exportResultsModal: {
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
