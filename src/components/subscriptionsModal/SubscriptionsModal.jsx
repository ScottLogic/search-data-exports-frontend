import React from 'react';
import PropTypes from 'prop-types';
import OptionsModal from '../reusableComponents/OptionsModal';
import createSubscription from '../../api/createSubscription';

const SubscriptionsModal = ({ showModal, lastRequest, closeModal }) => {
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    closeModal();
    createSubscription({
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
      modalTitle="Select a subscription frequency"
      submitButtonText="Subscribe"
    />
  );
};

SubscriptionsModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  lastRequest: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default SubscriptionsModal;
