import { connect } from 'react-redux';
import DigestModal from './DigestModal';
import getModalDisplayed from '../../selectors/DigestModal';
import { updateModalDisplayed } from '../../actions/DigestModal';
import { getLastRequest } from '../../selectors/App';

const mapStateToProps = state => ({
  showModal: getModalDisplayed(state),
  lastRequest: getLastRequest(state)
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(updateModalDisplayed(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(DigestModal);
