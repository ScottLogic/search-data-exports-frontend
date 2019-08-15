import { connect } from 'react-redux';
import { updateModalDisplayed } from '../../actions/DigestListModal';
import Header from './Header';

const mapDispatchToProps = dispatch => ({
  updateModalDisplayed: () => dispatch(updateModalDisplayed(true))
});

export default connect(
  null,
  mapDispatchToProps
)(Header);
