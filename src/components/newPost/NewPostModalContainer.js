import { connect } from 'react-redux';
import ExportResultsModal from './NewPostModal';
import { updateModalDisplayed } from '../../actions/NewPostModal';
import getModalDisplayed from '../../selectors/NewPostModal';

const mapStateToProps = state => ({
  showModal: getModalDisplayed(state)
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(updateModalDisplayed(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExportResultsModal);
