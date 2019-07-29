import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import handleModalSubmit from '../../api/exportResults';
import DownloadModal from '../reusableComponents/DownloadModal';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

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
        selectedType: event.target.downloadType.value,
        emailAddress: event.target.emailInput.value
      },
      lastRequest
    );
  };

  const downloadOptions = [
    'directDownload',
    'email'
  ];

  if (totalHitsCount < (process.env.REACT_APP_DIRECT_DOWNLOAD_LIMIT || 100)) {
    downloadOptions.unshift('pushNotification');
  }

  return (
    <DownloadModal
      options={downloadOptions}
      defaultSelectedOption={downloadOptions[0]}
      showModal={showModal}
      onSubmit={handleSubmit}
      onClose={closeModal}
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
