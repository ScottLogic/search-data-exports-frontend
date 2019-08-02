import React from 'react';
import PropTypes from 'prop-types';
import OptionsModal from '../reusableComponents/OptionsModal';
import digestRequest from '../../api/digestRequest';

const DigestModal = ({ showModal, lastRequest, closeModal }) => {
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    closeModal();
    digestRequest({
      frequency: event.target.selectedOption.value,
      searchCriteria: lastRequest
    });
  };

  const subscriptionOptions = ['daily', 'realTime'];

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
};

DigestModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  lastRequest: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default DigestModal;
