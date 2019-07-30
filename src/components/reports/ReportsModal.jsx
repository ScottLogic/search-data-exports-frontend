import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import './ReportsModal.css';
import DownloadModal from '../reusableComponents/DownloadModal';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

const reportItem = ({
  name,
  description,
  image = 'default.png',
  onView,
  onDownload
}) => (
  <li>
    <div className="reports-list-item">
      <div className="reports-list-item-image">
        <img src={`/images/icons/${image}`} alt={name} />
      </div>
      <div className="reports-list-item-details">
        <p>{name}</p>
        <p>{description}</p>
      </div>
      <div className="reports-list-item-options">
        {onView && <input type="button" value="View" onClick={onView} />}
        {onDownload && (
          <input type="button" value="Download" onClick={onDownload} />
        )}
      </div>
    </div>
  </li>
);

const ReportsModal = ({ showModal, closeModal }) => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState('');
  const [options, setOptions] = useState(['pdf']);

  const handleDownloadModalSubmit = (e) => {
    if (e) e.preventDefault();
    handleDownloadModalClose();
    console.log('Report:', selectedReport);
    console.log('Download Type:', e.target.downloadType.value);
  };

  const handleDownloadModalClose = () => {
    setShowDownloadModal(false);
    setOptions(['pdf']);
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    console.log('Submit', event);
  };

  const viewReport = (reportName) => {
    console.log('View', reportName);
  };

  const requestDownload = (reportName, onlyPDF = false) => {
    if (!onlyPDF) {
      setOptions([...options, 'png', 'svg']);
    }
    setSelectedReport(reportName);
    setShowDownloadModal(true);
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
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          height: '90vh',
          width: '90vw',
          position: 'relative'
        }
      }}
    >
      <form className="reports-form" onSubmit={handleSubmit}>
        <h1>Available Reports</h1>
        <hr />
        <ul className="reports-list">
          {reportItem({
            name: 'Post Frequency Report',
            description:
              'Graph report of posts per hour for the last 24 hours.',
            onView: () => viewReport('PostFreq'),
            onDownload: () => requestDownload('PostFreq')
          })}
          {reportItem({
            name: 'Trending Report',
            description: 'Report of the currently trending #tags.',
            onView: () => viewReport('Trending'),
            onDownload: () => requestDownload('Trending', true)
          })}
        </ul>
        <hr />
        <input type="button" onClick={closeModal} value="Close" />
      </form>
      <DownloadModal
        options={options}
        defaultSelectedOption={options[0]}
        showModal={showDownloadModal}
        onSubmit={handleDownloadModalSubmit}
        onClose={handleDownloadModalClose}
      />
    </ReactModal>
  );
};

reportItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onView: PropTypes.func.isRequired,
  onDownload: PropTypes.func.isRequired
};

ReportsModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ReportsModal;
