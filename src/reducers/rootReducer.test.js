import { combineReducers } from 'redux';
import app from './App';
import exportResultsModal from './ExportResultsModal';
import reportsModal from './ReportsModal';
import newPostModal from './NewPostModal';
import subscriptionsModal from './SubscriptionsModal';
import subscriptionsListModal from './SubscriptionsListModal';
import subscriptionsList from './SubscriptionsList';

import './rootReducer';

jest.mock('redux');

describe('root reducer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should combine the expected app reducers', async () => {
    expect(combineReducers).toHaveBeenCalledWith({
      app,
      exportResultsModal,
      reportsModal,
      newPostModal,
      subscriptionsModal,
      subscriptionsListModal,
      subscriptionsList
    });
  });
});
