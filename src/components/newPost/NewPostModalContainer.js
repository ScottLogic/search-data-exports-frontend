import { connect } from 'react-redux';
import NewPostModal from './NewPostModal';
import getModalDisplayed from '../../selectors/NewPostModal';
import { updateModalDisplayed } from '../../actions/NewPostModal';

const mapStateToProps = state => ({
  showModal: getModalDisplayed(state)
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(updateModalDisplayed(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPostModal);
