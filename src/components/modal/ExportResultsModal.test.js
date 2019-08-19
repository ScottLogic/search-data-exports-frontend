import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExportResultsModal from './ExportResultsModal';
import exportResultsRequest from '../../api/exportResults';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../api/exportResults', () => jest.fn());

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

  afterEach(() => {
    jest.clearAllMocks();
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

  it('handleSubmit calls closeModal', () => {
    wrapper.props().onSubmit({
      preventDefault: jest.fn(),
      target: {
        selectedOption: {
          value: 'direct'
        },
        emailInput: {
          value: 'test@example.com'
        }
      }
    });

    expect(modalProps.closeModal).toHaveBeenCalledTimes(1);
  });

  it('handleSubmit calls exportResultsRequest with the correct parameters', () => {
    wrapper.props().onSubmit({
      preventDefault: jest.fn(),
      target: {
        selectedOption: {
          value: 'direct'
        }
      }
    });

    expect(exportResultsRequest).toHaveBeenCalledTimes(1);
    expect(exportResultsRequest).toHaveBeenCalledWith(
      {
        selectedType: 'direct'
      },
      modalProps.lastRequest
    );
  });
});
