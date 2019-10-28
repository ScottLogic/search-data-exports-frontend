import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import './DigestListModal.css';
import deleteDigest from '../../api/digestDelete';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

const DigestItem = ({
  value, frequency, handleDelete
}) => (
  <li>
    <div className="digest-list-item">
      <div className="digest-list-frequency">
        {frequency}
      </div>
      <div className="digest-list-item-details">
        <p>
          <span>Search Criteria: </span>
          {value}
        </p>
      </div>
      <div className="reports-list-item-options">
        <button type="button" onClick={() => handleDelete({ value, frequency })}>Delete</button>
      </div>
    </div>
  </li>
);

const DigestListModal = ({
  showModal, closeModal, dailySubscriptionsList, getSubscriptions, realTimeSubscriptionsList
}) => {
  useEffect(() => {
    if (showModal) {
      getSubscriptions();
    }
  }, [getSubscriptions, showModal]);

  const handleDelete = (deleteObject) => {
    deleteDigest(deleteObject)
      .then(() => {
        getSubscriptions();
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
          height: '70vh',
          width: '70vw',
          position: 'relative'
        }
      }}
    >
      <form className="digest-form">
        <h1>Your active subscriptions</h1>
        <hr />
        <ul className="digest-list">
          {dailySubscriptionsList.map((subscription, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <DigestItem key={index} {...subscription} frequency="Daily" handleDelete={handleDelete} />
          ))}
          {realTimeSubscriptionsList.map((subscription, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <DigestItem key={index} {...subscription} frequency="Real Time" handleDelete={handleDelete} />
          ))}
        </ul>
        <hr />
        <input type="button" onClick={closeModal} value="Close" />
      </form>
    </ReactModal>
  );
};

DigestItem.propTypes = {
  value: PropTypes.string.isRequired,
  frequency: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired
};

DigestListModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  dailySubscriptionsList: PropTypes.array.isRequired,
  getSubscriptions: PropTypes.func.isRequired,
  realTimeSubscriptionsList: PropTypes.array.isRequired
};

export default DigestListModal;
