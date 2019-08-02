import { connect } from 'react-redux';
import DigestModal from './DigestModal';
import getModalDisplayed from '../../selectors/DigestModal';
import { updateModalDisplayed } from '../../actions/DigestModal';

const mapStateToProps = state => ({
  showModal: getModalDisplayed(state)
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(updateModalDisplayed(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(DigestModal);
