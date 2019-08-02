import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import useInputForm from '../../utilities/hooks';
import './NewPostModal.css';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

const NewPostModal = ({ showModal, closeModal }) => {
  const newPostInput = useInputForm('');
  const newTagsInput = useInputForm('');
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
          height: '50vh',
          width: '60vw',
          position: 'relative'
        }
      }}
    >
      <form className="reports-form">
        <h1>New Post</h1>
        <hr />
        <textarea id="NewPostText" className="FullTextInput" rows="7" {...newPostInput} />
        <input id="NewPostTags" className="TagTextInput" type="text" {...newTagsInput} />
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
