import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DownloadModal from './DownloadModal';

Enzyme.configure({ adapter: new Adapter() });

describe('<DownloadModal />', () => {
  let wrapper;

  const defaultProps = {
    options: ['optionOne', 'optionTwo', 'optionThree'],
    defaultSelectedOption: 'optionOne',
    showModal: true,
    onSubmit: jest.fn(),
    onClose: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<DownloadModal {...defaultProps} />);
  });

  it('Renders all the options', () => {
    const elements = wrapper.find('[name="downloadType"]').getElements();
    for (let i = 0; i < elements.length; i += 1) {
      expect(elements[i].props.value).toEqual(defaultProps.options[i]);
    }
  });

  it('Checks the defaultSelectedOption', () => {
    const radioElement = wrapper.find(`#${defaultProps.defaultSelectedOption}`).getElement();
    expect(radioElement.props.checked).toBeTruthy();
  });

  it('Doesnt render an email input field if email is not an option', () => {
    const elements = wrapper.find('input').getElements();
    expect(elements).toHaveLength(defaultProps.options.length);
    for (let i = 0; i < elements.length; i += 1) {
      expect(elements[i].props.id).toEqual(defaultProps.options[i]);
    }
  });

  it('Includes an email input field if email is an option', () => {
    const updatedProps = {
      ...defaultProps,
      options: [...defaultProps.options, 'email']
    };
    wrapper = shallow(<DownloadModal {...updatedProps} />);

    const elements = wrapper.find('input').getElements();

    expect(elements).toHaveLength(updatedProps.options.length + 1);
    for (let i = 0; i < elements.length - 1; i += 1) {
      expect(elements[i].props.id).toEqual(updatedProps.options[i]);
    }
    expect(elements[elements.length - 1].props.id).toEqual('emailInput');
  });

  it('Hides the email form input text field when the email radio is not selected', () => {
    const updatedProps = {
      ...defaultProps,
      options: [...defaultProps.options, 'email']
    };
    wrapper = shallow(<DownloadModal {...updatedProps} />);

    expect(wrapper.find('#emailInput').get(0).props.type).toEqual('hidden');
  });

  it('Shows the email form input text field when the email radio is selected', () => {
    const updatedProps = {
      ...defaultProps,
      options: [...defaultProps.options, 'email']
    };
    wrapper = shallow(<DownloadModal {...updatedProps} />);

    wrapper.find('#email').get(0).props.onChange({ target: { value: 'email' } });

    expect(wrapper.find('#emailInput').get(0).props.type).toEqual('email');
  });

  it('Calls the onClose function when the close button is clicked', () => {
    wrapper.find('button').first().simulate('click');
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('Calls the onSubmit function when the form is submitted', () => {
    wrapper.find('.download-options-form').simulate('submit');
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });
});
