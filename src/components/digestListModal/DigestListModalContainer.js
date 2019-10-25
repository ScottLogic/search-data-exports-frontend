import { connect } from 'react-redux';
import DigestListModal from './DigestListModal';
import getModalDisplayed from '../../selectors/DigestListModal';
import getDigestList from '../../selectors/DigestList';
import getRealtimeDigestList from '../../selectors/RealtimeDigestList';
import { updateModalDisplayed } from '../../actions/DigestListModal';
import fetchDigestList from '../../api/digestSearch';

const mapStateToProps = state => ({
  showModal: getModalDisplayed(state),
  digestList: getDigestList(state),
  realtimeDigestList: getRealtimeDigestList(state)
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(updateModalDisplayed(false)),
  fetchDigestList: () => fetchDigestList()(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DigestListModal);
