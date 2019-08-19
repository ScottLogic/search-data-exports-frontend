import React from 'react';
import PropTypes from 'prop-types';
import handleModalSubmit from '../../api/exportResults';
import OptionsModal from '../reusableComponents/OptionsModal';

const ExportResultsModal = ({
  showModal,
  lastRequest,
  totalHitsCount,
  closeModal
}) => {
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    closeModal();
    handleModalSubmit(
      {
        selectedType: event.target.selectedOption.value
      },
      lastRequest
    );
  };

  const downloadOptions = [
    'pushNotification',
    'email'
  ];

  if (totalHitsCount < (process.env.REACT_APP_DIRECT_DOWNLOAD_LIMIT || 100)) {
    downloadOptions.unshift('directDownload');
  }

  return (
    <OptionsModal
      options={downloadOptions}
      showModal={showModal}
      onSubmit={handleSubmit}
      onClose={closeModal}
      modalTitle="Select the download type"
      submitButtonText="Download"
    />
  );
};

ExportResultsModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  lastRequest: PropTypes.object.isRequired,
  totalHitsCount: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ExportResultsModal;
