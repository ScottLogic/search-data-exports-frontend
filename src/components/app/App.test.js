import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  let wrapper;

  const appProps = {
    data: [],
    maxPages: 1,
    currentPage: 0,
    lastRequest: {},
    isLoading: false,
    setCurrentPage: jest.fn(),
    setLastRequest: jest.fn(),
    fetchSearchResults: jest.fn(),
    showDigestModal: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<App {...appProps} />);
  });

  it('Renders the search form', () => {
    expect(wrapper.find('.container-index-select-form')).toBeDefined();
    expect(wrapper.find('#userPostSearch')).toBeDefined();
    expect(wrapper.find('#userSearch')).toBeDefined();
    expect(wrapper.find('#postSearch')).toBeDefined();
    expect(wrapper.find('[name="searchInput"]')).toBeDefined();
  });

  it('Renders the result list container', () => {
    expect(wrapper.find('.container-result-list')).toBeDefined();
  });

  it('Renders the pagination container', () => {
    expect(wrapper.find('.pagination')).toBeDefined();
  });

  it('Searching sets the current page and last request, and makes an API call', () => {
    const expectedRequest = {
      type: 'post',
      results: 10,
      page: 0,
      search: [{ value: '' }]
    };

    console.log(wrapper.find('.container-index-select-form').getElements());

    wrapper.find('.container-index-select-form form').simulate('submit');

    expect(appProps.setCurrentPage).toHaveBeenCalledTimes(1);
    expect(appProps.setCurrentPage).toHaveBeenCalledWith(0);
    expect(appProps.setLastRequest).toHaveBeenCalledTimes(1);
    expect(appProps.setLastRequest).toHaveBeenCalledWith(expectedRequest);
    expect(appProps.fetchSearchResults).toHaveBeenCalledTimes(1);
    expect(appProps.fetchSearchResults).toHaveBeenCalledWith(expectedRequest);
  });
});
