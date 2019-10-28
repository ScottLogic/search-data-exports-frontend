import { connect } from 'react-redux';
import DigestListModal from './SubscriptionsListModal';
import getModalDisplayed from '../../selectors/SubscriptionsListModal';
import selectDailySubscriptions from '../../selectors/DailySubscriptionsList';
import selectRealTimeSubscriptions from '../../selectors/RealTimeSubscriptionsList';
import { updateModalDisplayed } from '../../actions/SubscriptionsListModal';
import getSubscriptions from '../../api/getSubscriptions';

const mapStateToProps = state => ({
  showModal: getModalDisplayed(state),
  dailySubscriptionsList: selectDailySubscriptions(state),
  realTimeSubscriptionsList: selectRealTimeSubscriptions(state)
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(updateModalDisplayed(false)),
  getSubscriptions: () => getSubscriptions()(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DigestListModal);
