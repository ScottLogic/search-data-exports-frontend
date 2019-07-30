import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExportResultsModal from './ExportResultsModal';

Enzyme.configure({ adapter: new Adapter() });

describe('<ExportResultsModal />', () => {
  let wrapper;

  const modalProps = {
    showModal: true,
    lastRequest: {},
    totalHitsCount: 0,
    closeModal: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<ExportResultsModal {...modalProps} />);
  });

  it('Includes direct download as an option when totalHitsCount is less than 100', () => {
    const expectedOptions = ['directDownload', 'pushNotification', 'email'];

    expect(wrapper.props().options).toEqual(expectedOptions);
  });

  it('Does not include direct download as an option when totalHitsCount is greater than 100', () => {
    const expectedOptions = ['pushNotification', 'email'];

    const updatedProps = {
      ...modalProps,
      totalHitsCount: 101
    };
    wrapper = shallow(<ExportResultsModal {...updatedProps} />);

    expect(wrapper.props().options).toEqual(expectedOptions);
  });
});
