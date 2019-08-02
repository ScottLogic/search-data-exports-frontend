import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import './NewPostModal.css';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

const NewPostModal = ({ showModal, closeModal }) => {  
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
        <h1>New Post</h1>
        <hr />
        <hr />
        <input type="button" onClick={closeModal} value="Close" />
      </form>
    </ReactModal>
  );
};

NewPostModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default NewPostModal;
