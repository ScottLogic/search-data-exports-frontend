import React from 'react';
import PropTypes from 'prop-types';
import './ModalController.css';

const ModalController = ({
  hasData,
  searchPerformed,
  showExportResultsModal,
  showReportsModal,
  showNewPostModal,
  showSubscriptionsModal
}) => {
  const exportButton = hasData && (
    <input
      type="button"
      id="exportResultsButton"
      onClick={showExportResultsModal}
      value="Export Results"
    />
  );

  const digestSubscribeButton = (Object.keys(searchPerformed).length > 0) && (
    <input
      type="button"
      id="digestSubscribeButton"
      onClick={showSubscriptionsModal}
      value="Subscribe to digest"
    />
  );

  return (
    <div className="container-index-options">
      {digestSubscribeButton}
      {exportButton}
      <input
        type="button"
        id="addPostButton"
        onClick={showNewPostModal}
        value="Add Post"
      />
      <input
        type="button"
        id="showReportsButton"
        onClick={showReportsModal}
        value="Reports"
      />
    </div>
  );
};

ModalController.propTypes = {
  hasData: PropTypes.bool.isRequired,
  searchPerformed: PropTypes.object.isRequired,
  showExportResultsModal: PropTypes.func.isRequired,
  showReportsModal: PropTypes.func.isRequired,
  showNewPostModal: PropTypes.func.isRequired,
  showSubscriptionsModal: PropTypes.func.isRequired
};

export default ModalController;
