import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ModalController from './ModalController';

Enzyme.configure({ adapter: new Adapter() });

describe('<ModalController />', () => {
  let wrapper;

  const noDataProps = {
    hasData: false,
    showExportResultsModal: jest.fn(),
    showReportsModal: jest.fn(),
    showNewPostModal: jest.fn(),
    showDigestModal: jest.fn()
  };

  const dataProps = {
    ...noDataProps,
    hasData: true
  };

  beforeEach(() => {
    wrapper = shallow(<ModalController {...noDataProps} />);
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

  it('Does not render the Subscribe to digest button when hasData is false', () => {
    expect(wrapper.find('#digestSubscribeButton')).toHaveLength(0);
  });

  it('Renders the Subscribe to digest button when hasData is true', () => {
    wrapper = shallow(<ModalController {...dataProps} />);
    expect(wrapper.find('#digestSubscribeButton')).toHaveLength(1);
  });

  it('Calls showDigestModal when the Subscribe to digest button is clicked', () => {
    wrapper = shallow(<ModalController {...dataProps} />);
    wrapper.find('#digestSubscribeButton').simulate('click');
    expect(dataProps.showDigestModal).toHaveBeenCalledTimes(1);
  });
});
