import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import useInputForm from '../../utilities/hooks';
import handleModalSubmit from '../../api/exportResults';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

const ExportResultsModal = ({
  showModal,
  lastRequest,
  totalHitsCount,
  closeModal
}) => {
  const emailInput = useInputForm('');
  const { value: selectedType, onChange: handleTypeChange } = useInputForm(
    'pushNotification'
  );
  const showDirectDownloadOption = totalHitsCount
    < (process.env.REACT_APP_DIRECT_DOWNLOAD_LIMIT || 100);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    closeModal();
    handleModalSubmit(
      { selectedType, emailAddress: emailInput.value },
      lastRequest
    );
  };

  return (
    <ReactModal
      isOpen={showModal}
      onRequestClose={closeModal}
      style={{
        overlay: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        content: {
          height: '200px',
          width: '200px',
          position: 'relative'
        }
      }}
    >
      <p>Select the download type:</p>
      <form className="export-results-form" onSubmit={handleSubmit}>
        <label htmlFor="pushNotification">
          <input
            type="radio"
            name="exportType"
            id="pushNotification"
            value="pushNotification"
            checked={selectedType === 'pushNotification'}
            onChange={handleTypeChange}
          />
          Push Notification
        </label>
        <br />
        <div
          className="direct-download"
          style={showDirectDownloadOption ? {} : { display: 'none' }}
        >
          <label htmlFor="directDownload">
            <input
              type="radio"
              name="exportType"
              id="directDownload"
              value="directDownload"
              checked={selectedType === 'directDownload'}
              onChange={handleTypeChange}
            />
            Direct Download
          </label>
          <br />
        </div>
        <label htmlFor="email">
          <input
            type="radio"
            name="exportType"
            id="email"
            value="email"
            checked={selectedType === 'email'}
            onChange={handleTypeChange}
          />
          Email
        </label>
        <br />
        <div
          className="email"
          style={selectedType === 'email' ? {} : { display: 'none' }}
        >
          <label htmlFor="emailInput">
            Enter your email:
            <input
              type={selectedType === 'email' ? 'email' : 'hidden'}
              id="emailInput"
              {...emailInput}
              required
            />
          </label>
          <br />
        </div>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
        <button type="submit">Download</button>
      </form>
    </ReactModal>
  );
};

ExportResultsModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  lastRequest: PropTypes.object.isRequired,
  totalHitsCount: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ExportResultsModal;
