import React from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import { useInputForm } from '../../utilities/hooks';
import { handleModalSubmit } from '../../api/exportResults';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement("#root");

const ExportResultsModal = ({
  showModal,
  lastRequest,
  totalHitsCount,
  closeModal
}) => {
  const emailInput = useInputForm('');
  const { value: selectedType, onChange: handleTypeChange } = useInputForm('pushNotification');
  const showDirectDownloadOption = totalHitsCount < (process.env.REACT_APP_DIRECT_DOWNLOAD_LIMIT || 100);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    closeModal();
    handleModalSubmit({ selectedType, emailAddress: emailInput.value }, lastRequest);
  };

  return (
    <ReactModal
      isOpen={showModal}
      onRequestClose={closeModal}
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        content: {
          height: "200px",
          width: "200px",
          position: "relative"
        }
      }}
    >
      <p>Select the download type:</p>
      <form className="export-results-form" onSubmit={handleSubmit}>
        <input
          type="radio"
          name="exportType"
          value="pushNotification"
          checked={selectedType === "pushNotification"}
          onChange={handleTypeChange}
        />
        <label htmlFor="pushNotification">Push Notification</label>
        <br />
        <div className="direct-download" style={showDirectDownloadOption ? {} : { display: "none" }}>
          <input
            type="radio"
            name="exportType"
            value="directDownload"
            checked={selectedType === "directDownload"}
            onChange={handleTypeChange}
          />
          <label htmlFor="directDownload">Direct Download</label>
          <br />
        </div>
        <input
          type="radio"
          name="exportType"
          value="email"
          checked={selectedType === "email"}
          onChange={handleTypeChange}
        />
        <label htmlFor="email">Email</label>
        <br />
        <div className="email" style={selectedType === "email" ? {} : { display: "none" }}>
          <label htmlFor="emailInput">Enter your email:</label>
          <input
            type={selectedType === "email" ? "email" : "hidden"}
            id="emailInput"
            {...emailInput}
            required
          />
          <br />
        </div>
        <button type="button" onClick={closeModal}>Cancel</button>
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
