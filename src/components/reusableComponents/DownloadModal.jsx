import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import useInputForm from '../../utilities/hooks';

const camelCaseToText = (text) => {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const radioButtonFormat = (option, selectedType, onChange) => (
  <label htmlFor={option}>
    <input
      type="radio"
      name="downloadType"
      id={option}
      value={option}
      checked={selectedType === option}
      onChange={onChange}
      required
    />
    {camelCaseToText(option)}
  </label>
);

const emailInputFormat = (selectedType, emailInput) => (
  <div
    className="email"
    style={selectedType === 'email' ? {} : { display: 'none' }}
  >
    <label htmlFor="emailInput">
      Enter your email:
      <input
        type={selectedType === 'email' ? 'email' : 'hidden'}
        id="emailInput"
        {...emailInput}
        required
      />
    </label>
  </div>
);

const DownloadModal = ({
  options,
  defaultSelectedOption,
  showModal,
  onSubmit,
  onClose
}) => {
  const emailInput = useInputForm('');
  const { value: selectedType, onChange: handleTypeChange } = useInputForm(
    defaultSelectedOption
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
      <p>Select the download type:</p>
      <form className="export-results-form" onSubmit={onSubmit}>
        {options.map(option => (
          <React.Fragment key={option}>
            {radioButtonFormat(option, selectedType, handleTypeChange)}
            <br />
          </React.Fragment>
        ))}
        {options.includes('email') && emailInputFormat(selectedType, emailInput)}
        <button type="button" onClick={onClose}>
          Cancel
        </button>
        <button type="submit">Download</button>
      </form>
    </ReactModal>
  );
};

DownloadModal.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultSelectedOption: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DownloadModal;
