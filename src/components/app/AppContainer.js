import { connect } from 'react-redux';
import App from './App';
import {
  getData,
  getMaxPages,
  getCurrentPage,
  getLastRequest,
  getIsLoading
} from '../../selectors/App';
import { pageUpdated, requestUpdated } from '../../actions/App';
import { updateModalDisplayed as showExportResultsModal } from '../../actions/ExportResultsModal';
import { updateModalDisplayed as showReportsModal } from '../../actions/ReportsModal';
import fetchSearchResults from '../../api/searchRequest';

const mapStateToProps = state => ({
  data: getData(state),
  maxPages: getMaxPages(state),
  currentPage: getCurrentPage(state),
  lastRequest: getLastRequest(state),
  isLoading: getIsLoading(state)
});

const mapDispatchToProps = dispatch => ({
  setCurrentPage: pageNum => dispatch(pageUpdated(pageNum)),
  setLastRequest: request => dispatch(requestUpdated(request)),
  fetchSearchResults: request => fetchSearchResults(request)(dispatch),
  showExportResultsModal: () => dispatch(showExportResultsModal(true)),
  showReportsModal: () => dispatch(showReportsModal(true))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
