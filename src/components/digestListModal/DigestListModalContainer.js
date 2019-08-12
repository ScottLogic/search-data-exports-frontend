import { connect } from 'react-redux';
import ReportsModal from './DigestListModal';
import getModalDisplayed from '../../selectors/DigestListModal';
import { updateModalDisplayed } from '../../actions/DigestListModal';

const mapStateToProps = state => ({
  showModal: getModalDisplayed(state)
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(updateModalDisplayed(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportsModal);
