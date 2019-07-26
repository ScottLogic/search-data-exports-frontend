import { combineReducers } from 'redux';
import app from './App';
import exportResultsModal from './ExportResultsModal';
import reportsModal from './ReportsModal';

const rootReducer = combineReducers({
  app,
  exportResultsModal,
  reportsModal
});

export default rootReducer;
