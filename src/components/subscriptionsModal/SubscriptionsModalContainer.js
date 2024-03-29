import { connect } from 'react-redux';
import SubscriptionsModal from './SubscriptionsModal';
import getModalDisplayed from '../../selectors/SubscriptionsModal';
import { updateModalDisplayed } from '../../actions/SubscriptionsModal';
import { getLastRequest } from '../../selectors/App';

const mapStateToProps = state => ({
  showModal: getModalDisplayed(state),
  lastRequest: getLastRequest(state)
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(updateModalDisplayed(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsModal);
