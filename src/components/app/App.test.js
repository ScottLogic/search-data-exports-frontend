import React from 'react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  let wrapper;
  const appProps = {
    data: [],
    currentPage: 0,
    maxPages: 1,
    searchCriteria: {},
    handleSearch: jest.fn(),
    handlePageChange: jest.fn()
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

  it('Calls the handleSearch function when the search form is submitted', () => {
    wrapper.find('.container-index-select-form form').simulate('submit');
    expect(appProps.handleSearch).toHaveBeenCalledTimes(1);
  });
});
