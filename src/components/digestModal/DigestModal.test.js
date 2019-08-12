import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DigestModal from './DigestModal';
import digestRequest from '../../api/digestRequest';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../api/digestRequest', () => jest.fn());

describe('<DigestModal />', () => {
  let wrapper;

  const defaultProps = {
    showModal: true,
    lastRequest: { test: 'example' },
    closeModal: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<DigestModal {...defaultProps} />);
    wrapper.props().onSubmit({ preventDefault: jest.fn(), target: { selectedOption: { value: 'daily' } } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('handleSubmit calls closeModal', () => {
    expect(defaultProps.closeModal).toHaveBeenCalledTimes(1);
  });

  it('handleSubmit calls digestRequest with the correct parameters', () => {
    expect(digestRequest).toHaveBeenCalledTimes(1);
    expect(digestRequest).toHaveBeenCalledWith({ frequency: 'daily', searchCriteria: defaultProps.lastRequest });
  });
});
