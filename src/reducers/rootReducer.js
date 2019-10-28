import { combineReducers } from 'redux';
import app from './App';
import exportResultsModal from './ExportResultsModal';
import reportsModal from './ReportsModal';
import newPostModal from './NewPostModal';
import subscriptionsModal from './SubscriptionsModal';
import subscriptionsListModal from './SubscriptionsListModal';
import subscriptionsList from './SubscriptionsList';

const rootReducer = combineReducers({
  app,
  exportResultsModal,
  reportsModal,
  newPostModal,
  subscriptionsModal,
  subscriptionsListModal,
  subscriptionsList
});

export default rootReducer;
