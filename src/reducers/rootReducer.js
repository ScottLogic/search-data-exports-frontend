import { combineReducers } from 'redux';
import app from './App';
import exportResultsModal from './ExportResultsModal';

const rootReducer = combineReducers({
  app,
  exportResultsModal
});

export default rootReducer;
