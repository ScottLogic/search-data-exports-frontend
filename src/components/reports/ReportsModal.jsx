import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import './ReportsModal.css';
import handleModalSubmit from '../../api/reportResults';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

const reportItem = ({
  name,
  description,
  image = 'default.png',
  onView,
  onDownload,
  viewURL,
  onHide
}) => (
  <li>
    <div className="reports-list-item-holder">
      <div className="reports-list-item">
        <div className="reports-list-item-image">
          <img src={`/images/icons/${image}`} alt={name} />
        </div>
        <div className="reports-list-item-details">
          <p>{name}</p>
          <p>{description}</p>
        </div>
        <div className="reports-list-item-options">
          {onView && <input type="button" value={(!viewURL) ? 'View' : 'Hide'} onClick={(!viewURL) ? onView : onHide} />}
          {onDownload && (
            <input type="button" value="Download" onClick={onDownload} />
          )}
        </div>
      </div>
      {viewURL && (
        <div className="reports-list-item-content">
          <img src={viewURL} width="100%" height="auto" alt="Report Chart" />
        </div>
      )
        }
    </div>
  </li>
);

const ReportsModal = ({ showModal, closeModal }) => {
  const [graphicalReportURL, setGraphicalReportURL] = useState('');

  const viewReport = (reportName, callback) => {
    handleModalSubmit({
      selectedType: 'svg',
      reportName
    }, callback);
  };

  const downloadReport = (reportName) => {
    handleModalSubmit({
      selectedType: 'svg',
      reportName
    });
  };

  const downloadPDF = (reportName) => {
    handleModalSubmit({
      selectedType: 'pdf',
      reportName
    });
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
      <form className="reports-form">
        <h1>Available Reports</h1>
        <hr />
        <ul className="reports-list">
          {reportItem({
            name: 'Post Frequency Report',
            description:
              'Graph report of posts per hour for the last 24 hours.',
            onView: () => viewReport('PostFreq', setGraphicalReportURL),
            onDownload: () => downloadReport('PostFreq'),
            viewURL: graphicalReportURL,
            onHide: () => setGraphicalReportURL('')
          })}
          {reportItem({
            name: 'Trending Report',
            description: 'Report of the currently trending #tags.',
            onDownload: () => downloadPDF('Trending')
          })}
        </ul>
        <hr />
        <input type="button" onClick={closeModal} value="Close" />
      </form>
    </ReactModal>
  );
};

reportItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onView: PropTypes.func,
  onDownload: PropTypes.func,
  viewURL: PropTypes.string,
  onHide: PropTypes.func
};

reportItem.defaultProps = {
  onView: undefined,
  onDownload: undefined,
  viewURL: '',
  onHide: undefined
};

ReportsModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ReportsModal;
