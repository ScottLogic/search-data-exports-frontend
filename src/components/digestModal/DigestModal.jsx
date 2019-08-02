import React from 'react';
import PropTypes from 'prop-types';
import OptionsModal from '../reusableComponents/OptionsModal';

const DigestModal = ({ showModal, closeModal }) => {
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    closeModal();
    console.log('Subscribe modal submitted with option:', event.target.selectedOption.value);
  };

  const subscriptionOptions = ['Daily', 'Real-time'];

  return (
    <OptionsModal
      options={subscriptionOptions}
      showModal={showModal}
      onSubmit={handleSubmit}
      onClose={closeModal}
      modalTitle="Select a digest frequency"
      submitButtonText="Subscribe"
    />
  );
}

DigestModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default DigestModal;
