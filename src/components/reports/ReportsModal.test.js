import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReportsModal from './ReportsModal';
import reportResultsRequest from '../../api/reportResults';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../api/reportResults', () => jest.fn());

describe('<ReportsModal />', () => {
  let wrapper;

  const defaultProps = {
    showModal: true,
    closeModal: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<ReportsModal {...defaultProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Clicking download for the trending report calls the api with the correct parameters', () => {
    wrapper.find('input[value="Download"]').at(1).simulate('click');
    expect(reportResultsRequest).toHaveBeenCalledTimes(1);
    expect(reportResultsRequest).toHaveBeenCalledWith({
      selectedType: 'pdf',
      reportName: 'Trending'
    });
  });

  it('Clicking download in the download modal calls the api with the correct parameters', () => {
    wrapper.find('input[value="View"]').at(0).simulate('click');
    expect(reportResultsRequest).toHaveBeenCalledTimes(1);
    expect(reportResultsRequest).toHaveBeenCalledWith({
      selectedType: 'svg',
      reportName: 'PostFreq'
    }, expect.anything());
  });
});
