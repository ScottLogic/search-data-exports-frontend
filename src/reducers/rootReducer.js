import { combineReducers } from 'redux';
import app from './App';
import exportResultsModal from './ExportResultsModal';
import reportsModal from './ReportsModal';
import newPostModal from './NewPostModal';
import digestModal from './DigestModal';
import digestListModal from './DigestListModal';

const rootReducer = combineReducers({
  app,
  exportResultsModal,
  reportsModal,
  newPostModal,
  digestModal,
  digestListModal
});

export default rootReducer;
