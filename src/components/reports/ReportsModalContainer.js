import { connect } from 'react-redux';
import ReportsModal from './ReportsModal';
import { getModalDisplayed } from '../../selectors/ReportsModal';
import { updateModalDisplayed } from '../../actions/ReportsModal';

const mapStateToProps = state => ({
  showModal: getModalDisplayed(state)
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(updateModalDisplayed(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportsModal);
