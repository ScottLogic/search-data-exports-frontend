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
  fetchSearchResults: request => fetchSearchResults(request)(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
