import { connect } from 'react-redux';
import ExportResultsModal from './ExportResultsModal';
import { updateModalDisplayed } from '../../actions/ExportResultsModal';
import { getModalDisplayed } from '../../selectors/ExportResultsModal';
import { getLastRequest, getTotalHitsCount } from '../../selectors/App';

const mapStateToProps = state => ({
  showModal: getModalDisplayed(state),
  lastRequest: getLastRequest(state),
  totalHitsCount: getTotalHitsCount(state)
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(updateModalDisplayed(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExportResultsModal);
