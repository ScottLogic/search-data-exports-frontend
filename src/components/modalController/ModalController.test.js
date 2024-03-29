import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ModalController from './ModalController';

Enzyme.configure({ adapter: new Adapter() });

describe('<ModalController />', () => {
  let wrapper;

  const noDataProps = {
    hasData: false,
    searchPerformed: {},
    showExportResultsModal: jest.fn(),
    showReportsModal: jest.fn(),
    showNewPostModal: jest.fn(),
    showSubscriptionsModal: jest.fn()
  };

  const dataProps = {
    ...noDataProps,
    hasData: true,
  };

  const postSearchProps = {
    ...noDataProps,
    searchPerformed: { value: 'test' },
  };

  beforeEach(() => {
    wrapper = shallow(<ModalController {...noDataProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Calls showReportsModal when the Reports button is clicked', () => {
    wrapper.find('#showReportsButton').simulate('click');
    expect(noDataProps.showReportsModal).toHaveBeenCalledTimes(1);
  });

  it('Calls showNewPostModal when the Add Post button is clicked', () => {
    wrapper.find('#addPostButton').simulate('click');
    expect(noDataProps.showNewPostModal).toHaveBeenCalledTimes(1);
  });

  it('Does not render the Export Results button when hasData is false', () => {
    expect(wrapper.find('#exportResultsButton')).toHaveLength(0);
  });

  it('Renders the Export Results button when hasData is true', () => {
    wrapper = shallow(<ModalController {...dataProps} />);
    expect(wrapper.find('#exportResultsButton')).toHaveLength(1);
  });

  it('Calls showExportResultsModal when the Export Results button is clicked', () => {
    wrapper = shallow(<ModalController {...dataProps} />);
    wrapper.find('#exportResultsButton').simulate('click');
    expect(dataProps.showExportResultsModal).toHaveBeenCalledTimes(1);
  });

  it('Does not render the Subscribe to search button when searchPerformed is empty', () => {
    expect(wrapper.find('#subscribeButton')).toHaveLength(0);
  });

  it('Renders the Subscribe to search button when hasData is not empty', () => {
    wrapper = shallow(<ModalController {...postSearchProps} />);
    expect(wrapper.find('#subscribeButton')).toHaveLength(1);
  });

  it('Calls showSubscriptionsModal when the Subscribe to search button is clicked', () => {
    wrapper = shallow(<ModalController {...postSearchProps} />);
    wrapper.find('#subscribeButton').simulate('click');
    expect(dataProps.showSubscriptionsModal).toHaveBeenCalledTimes(1);
  });
});
