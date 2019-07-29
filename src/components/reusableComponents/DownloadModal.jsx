import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import useInputForm from '../../utilities/hooks';

const radioButtonFormat = (option, selectedType, onChange) => (
  <label htmlFor={option}>
    <input
      type="radio"
      name="downloadType"
      id={option}
      value={option}
      checked={selectedType === option}
      onChange={onChange}
    />
    {option}
  </label>
);

const emailInputFormat = (selectedType) => {
  const emailInput = useInputForm('');

  return (
    <div
      className="email"
      style={selectedType === "email" ? {} : { display: "none" }}
    >
      <label htmlFor="emailInput">
        <input
          type={selectedType === "email" ? "email" : "hidden"}
          id="emailInput"
          {...emailInput}
          required
        />
        Enter your email:
      </label>
    </div>
  );
};

const DownloadModal = ({
  options,
  defaultSelectedOption,
  showModal,
  onSubmit,
  onClose
}) => {
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
          <>
            {radioButtonFormat(option, selectedType, handleTypeChange)}
          </>
        ))}
        {options.includes('email') && emailInputFormat(selectedType)}
      </form>
    </ReactModal>
  );
};

radioButtonFormat.propTypes = {
  option: PropTypes.string.isRequired,
  selectedType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

emailInputFormat.propTypes = {
  selectedType: PropTypes.string.isRequired
};

DownloadModal.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultSelectedOption: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DownloadModal;
