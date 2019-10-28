import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SubscriptionsModal from './SubscriptionsModal';
import createSubscription from '../../api/createSubscription';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../api/createSubscription', () => jest.fn());

describe('<SubscriptionsModal />', () => {
  let wrapper;

  const defaultProps = {
    showModal: true,
    lastRequest: { test: 'example' },
    closeModal: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<SubscriptionsModal {...defaultProps} />);
    wrapper.props().onSubmit({ preventDefault: jest.fn(), target: { selectedOption: { value: 'daily' } } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('handleSubmit calls closeModal', () => {
    expect(defaultProps.closeModal).toHaveBeenCalledTimes(1);
  });

  it('handleSubmit calls createSubscription with the correct parameters', () => {
    expect(createSubscription).toHaveBeenCalledTimes(1);
    expect(createSubscription).toHaveBeenCalledWith({ frequency: 'daily', searchCriteria: defaultProps.lastRequest });
  });
});
