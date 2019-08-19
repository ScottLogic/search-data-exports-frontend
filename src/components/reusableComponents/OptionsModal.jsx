import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import useInputForm from '../../utilities/hooks';

const camelCaseToText = (text) => {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const radioButtonFormat = (option, selectedType, onChange, capitaliseOutput) => (
  <label htmlFor={option}>
    <input
      type="radio"
      name="selectedOption"
      id={option}
      value={option}
      checked={selectedType === option}
      onChange={onChange}
      required
    />
    {capitaliseOutput ? option.toUpperCase() : camelCaseToText(option)}
  </label>
);

const OptionsModal = ({
  options,
  showModal,
  onSubmit,
  onClose,
  capitaliseOutput,
  modalTitle,
  submitButtonText
}) => {
  const { value: selectedType, onChange: handleTypeChange } = useInputForm(
    options[0]
  );

  return (
    <ReactModal
      isOpen={showModal}
      onRequestClose={onClose}
      style={{
        overlay: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        },
        content: {
          height: '200px',
          width: '200px',
          position: 'relative'
        }
      }}
    >
      <p>{`${modalTitle}:`}</p>
      <form className="download-options-form" onSubmit={onSubmit}>
        {options.map(option => (
          <React.Fragment key={option}>
            {radioButtonFormat(option, selectedType, handleTypeChange, capitaliseOutput)}
            <br />
          </React.Fragment>
        ))}
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button type="submit">{submitButtonText}</button>
      </form>
    </ReactModal>
  );
};

OptionsModal.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  showModal: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  capitaliseOutput: PropTypes.bool,
  modalTitle: PropTypes.string,
  submitButtonText: PropTypes.string
};

OptionsModal.defaultProps = {
  capitaliseOutput: false,
  modalTitle: 'Select an option',
  submitButtonText: 'Submit'
};

export default OptionsModal;
