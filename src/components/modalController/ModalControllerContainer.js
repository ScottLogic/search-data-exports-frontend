import { connect } from 'react-redux';
import ModalController from './ModalController';
import { updateModalDisplayed as showExportResultsModal } from '../../actions/ExportResultsModal';
import { updateModalDisplayed as showReportsModal } from '../../actions/ReportsModal';
import { updateModalDisplayed as showNewPostModal } from '../../actions/NewPostModal';
import { updateModalDisplayed as showDigestModal } from '../../actions/DigestModal';

const mapDispatchToProps = dispatch => ({
  showExportResultsModal: () => dispatch(showExportResultsModal(true)),
  showReportsModal: () => dispatch(showReportsModal(true)),
  showNewPostModal: () => dispatch(showNewPostModal(true)),
  showDigestModal: () => dispatch(showDigestModal(true))
});

export default connect(null, mapDispatchToProps)(ModalController);
