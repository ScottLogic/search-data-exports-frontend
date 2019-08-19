import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import OptionsModal from './OptionsModal';

Enzyme.configure({ adapter: new Adapter() });

describe('<OptionsModal />', () => {
  let wrapper;

  const defaultProps = {
    options: ['optionOne', 'optionTwo', 'optionThree'],
    showModal: true,
    onSubmit: jest.fn(),
    onClose: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<OptionsModal {...defaultProps} />);
  });

  it('Renders all the options', () => {
    const elements = wrapper.find('[name="downloadType"]').getElements();
    for (let i = 0; i < elements.length; i += 1) {
      expect(elements[i].props.value).toEqual(defaultProps.options[i]);
    }
  });

  it('Checks the first option as the default selected', () => {
    const radioElement = wrapper.find(`#${defaultProps.options[0]}`).getElement();
    expect(radioElement.props.checked).toBeTruthy();
  });

  it('Renders all expected input fields', () => {
    const elements = wrapper.find('input').getElements();
    expect(elements).toHaveLength(defaultProps.options.length);
    for (let i = 0; i < elements.length; i += 1) {
      expect(elements[i].props.id).toEqual(defaultProps.options[i]);
    }
  });

  it('Calls the onClose function when the close button is clicked', () => {
    wrapper.find('button').first().simulate('click');
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('Calls the onSubmit function when the form is submitted', () => {
    wrapper.find('.download-options-form').simulate('submit');
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('Renders the correct title if the modalTitle prop is set', () => {
    const expectedTitle = 'Test Title';
    const updatedProps = { ...defaultProps, modalTitle: expectedTitle };

    wrapper = shallow(<OptionsModal {...updatedProps} />);

    expect(wrapper.find('p').first().text()).toEqual(`${expectedTitle}:`);
  });

  it('Renders the correct text for the submit button if the submitButtonText prop is set', () => {
    const expectedText = 'Test Button Text';
    const updatedProps = { ...defaultProps, submitButtonText: expectedText };

    wrapper = shallow(<OptionsModal {...updatedProps} />);

    expect(wrapper.find('button[type="submit"]').first().text()).toEqual(expectedText);
  });
});
