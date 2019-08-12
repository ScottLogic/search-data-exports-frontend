import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

const DigestListModal = ({ showModal, closeModal }) => (
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
      <ul className="reports-list">
        <li>Report 1</li>
        <li>Report 2</li>
        <li>Report 3</li>
      </ul>
      <hr />
      <input type="button" onClick={closeModal} value="Close" />
    </form>
  </ReactModal>
);

DigestListModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default DigestListModal;
