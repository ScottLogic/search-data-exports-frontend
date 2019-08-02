import { combineReducers } from 'redux';
import app from './App';
import exportResultsModal from './ExportResultsModal';
import reportsModal from './ReportsModal';
import newPostModal from './NewPostModal';

const rootReducer = combineReducers({
  app,
  exportResultsModal,
  reportsModal,
  newPostModal
});

export default rootReducer;
