import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import './DigestListModal.css';
import deleteDigest from '../../api/digestDelete';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

const DigestItem = ({ 
  field, value, frequency, handleDelete
}) => (
  <li>
    <div className="digest-list-item">
      <div className="digest-list-frequency">
        {frequency}
      </div>
      <div className="digest-list-item-details">
        <p>
          <span>Fields: </span>
          {field}
        </p>
        <p>
          <span>Search Criteria: </span>
          {value}
        </p>
      </div>
      <div className="reports-list-item-options">
        <button type="button" onClick={() => handleDelete({ field, value, frequency })}>Delete</button>
      </div>
    </div>
  </li>
);

const DigestListModal = ({
  showModal, closeModal, digestList, fetchDigestList
}) => {
  useEffect(() => {
    if (showModal) {
      fetchDigestList();
    }
  }, [fetchDigestList, showModal]);

  const handleDelete = (deleteObject) => {
    deleteDigest(deleteObject);
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
          height: '70vh',
          width: '70vw',
          position: 'relative'
        }
      }}
    >
      <form className="digest-form">
        <h1>Currently Subscribed Digests</h1>
        <hr />
        <ul className="digest-list">
          {digestList.map((digest, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <DigestItem key={index} {...digest} frequency="Daily" handleDelete={handleDelete} />
          ))}
        </ul>
        <hr />
        <input type="button" onClick={closeModal} value="Close" />
      </form>
    </ReactModal>
  );
};

DigestItem.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  frequency: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired
};

DigestListModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  digestList: PropTypes.array.isRequired,
  fetchDigestList: PropTypes.func.isRequired
};

export default DigestListModal;
