import React from 'react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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
    showExportResultsModal: jest.fn(),
    showReportsModal: jest.fn()
  };

  const testData = [
    {
      Type: "posts",
      uuid: "9yEH0msBcSVQ8Ni1lRpT",
      UserID: "52",
      DateCreated: "2019-02-13T21:14:17.7Z",
      Content: "The sky is clear; the stars are twinkling.",
      Tags: ["#percent", "#experiment"]
    },
    {
      Type: "posts",
      uuid: "-CEH0msBcSVQ8Ni1lRpT",
      UserID: "65",
      DateCreated: "2018-07-20T14:23:28.505Z",
      Content:
        "What was the person thinking when they discovered cow's milk was fine for human consumptionâ€¦ and why did they do it in the first place!?",
      Tags: ["#democratic", "#crusade", "#progress", "#channel"]
    }
  ];

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
      search: [
        { field: 'all', value: '' }
      ]
    };
    
    wrapper.find('.container-index-select-form form').simulate('submit');

    expect(appProps.setCurrentPage).toHaveBeenCalledTimes(1);
    expect(appProps.setCurrentPage).toHaveBeenCalledWith(0);
    expect(appProps.setLastRequest).toHaveBeenCalledTimes(1);
    expect(appProps.setLastRequest).toHaveBeenCalledWith(expectedRequest);
    expect(appProps.fetchSearchResults).toHaveBeenCalledTimes(1);
    expect(appProps.fetchSearchResults).toHaveBeenCalledWith(expectedRequest);
  });

  it("Does not render the export button for an empty dataset", () => {
    expect(wrapper.find("#exportResultsButton")).toHaveLength(0);
  });

  it("Renders the export button for a populated dataset", () => {
    const newProps = {...appProps, data: testData}
    wrapper = shallow(<App {...newProps} />);    
    expect(wrapper.find("#exportResultsButton")).toHaveLength(1);
  });

  it("Calls handleExportClick when the export results button is clicked", () => {
    const newProps = {...appProps, data: testData}
    wrapper = shallow(<App {...newProps} />);
    wrapper.find("#exportResultsButton").simulate("click");    
    expect(newProps.showExportResultsModal).toHaveBeenCalledTimes(1);
  });
});
