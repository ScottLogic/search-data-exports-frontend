import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

const DigestItem = ({ field, value }) => (
  <li>
    <div className="digest-list-item">
      <div className="digest-list-item-details">
        <p>{field}</p>
        <p>{value}</p>
      </div>
      <div className="digest-list-item-details">
        <button type="button">Delete</button>
      </div>
    </div>
  </li>
);

const DigestListModal = ({
  showModal, closeModal, digestList, fetchDigestList
}) => {
  useEffect(() => {
    fetchDigestList();
  }, [fetchDigestList]);

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
      <form className="reports-form">
        <h1>Currently Subscribed Digests</h1>
        <hr />
        <ul className="digest-list">
          {digestList.map((digest, index) => (
            <DigestItem key={index} {...digest} />
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
  value: PropTypes.string.isRequired
};

DigestListModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  digestList: PropTypes.array.isRequired,
  fetchDigestList: PropTypes.func.isRequired
};

export default DigestListModal;
