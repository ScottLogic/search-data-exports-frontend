import { combineReducers } from 'redux';
import app from './App';
import exportResultsModal from './ExportResultsModal';
import reportsModal from './ReportsModal';
import digestModal from './DigestModal';

const rootReducer = combineReducers({
  app,
  exportResultsModal,
  reportsModal,
  digestModal
});

export default rootReducer;
