import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import useInputForm from '../../utilities/hooks';
import handleModalSubmit from '../../api/newPost';
import './NewPostModal.css';

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root');

const NewPostModal = ({ showModal, closeModal }) => {
  const newPostInput = useInputForm('');
  const newTagsInput = useInputForm('');

  const resetContent = (event) => {
    if (event) event.preventDefault();
    newPostInput.setValue('');
    newTagsInput.setValue('');
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    handleModalSubmit({
      Post: newPostInput.value,
      Tags: newTagsInput.value
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
          height: '50vh',
          width: '60vw',
          position: 'relative'
        }
      }}
    >
      <form className="reports-form" onSubmit={handleSubmit}>
        <h1>Create New Post</h1>
        <hr />
        <label htmlFor="NewPostText">
          New Helix:
          <textarea required id="NewPostText" className="FullTextInput" rows="7" onChange={newPostInput.onChange} value={newPostInput.value} placeholder="What is happening?" />
        </label>
        <label htmlFor="NewPostTags">
          Tags:
          <input id="NewPostTags" className="TagTextInput" type="text" required onChange={newTagsInput.onChange} value={newTagsInput.value} placeholder="Helix Tags" />
        </label>
        <hr />
        <input type="button" onClick={closeModal} value="Close" />
        <input type="button" onClick={resetContent} value="Reset" />
        <input type="submit" value="Add" />
      </form>
    </ReactModal>
  );
};

NewPostModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default NewPostModal;
