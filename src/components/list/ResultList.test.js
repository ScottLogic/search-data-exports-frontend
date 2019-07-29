import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResultList from './ResultList';

Enzyme.configure({ adapter: new Adapter() });

describe('<ResultList />', () => {
  let wrapper;

  const userID = '52';
  const dateCreated = '2019-02-13T21:14:17.7Z';
  const content = 'The sky is clear; the stars are twinkling.';
  const testData = [
    {
      Type: 'posts',
      uuid: '9yEH0msBcSVQ8Ni1lRpT',
      UserID: userID,
      DateCreated: dateCreated,
      Content: content,
      Tags: ['#percent', '#experiment']
    },
    {
      Type: 'posts',
      uuid: '-CEH0msBcSVQ8Ni1lRpT',
      UserID: '65',
      DateCreated: '2018-07-20T14:23:28.505Z',
      Content:
        "What was the person thinking when they discovered cow's milk was fine for human consumptionâ€¦ and why did they do it in the first place!?",
      Tags: ['#democratic', '#crusade', '#progress', '#channel']
    }
  ];

  beforeEach(() => {
    wrapper = shallow(<ResultList data={testData} />);
  });

  it('Can handle an empty data set', () => {
    const emptyResultListWrapper = shallow(<ResultList data={[]} />);
    expect(emptyResultListWrapper.find('.result-list li')).toHaveLength(0);
  });

  it('Renders a container for each data element', () => {
    const rowContainerNodes = wrapper.find('.container-result-row');
    expect(rowContainerNodes).toBeDefined();
    expect(rowContainerNodes).toHaveLength(2);
  });

  it('Renders the correct UserID for the first element', () => {
    const userIDNode = wrapper
      .find('.container-result-row-user-date div')
      .first()
      .getElement();
    expect(userIDNode).toBeDefined();
    expect(userIDNode.props.children).toEqual(userID);
  });

  it('Renders the correct DateCreated for the first element', () => {
    const dateCreatedNode = wrapper
      .find('.container-result-row-user-date div')
      .getElements()[1];
    expect(dateCreatedNode).toBeDefined();
    expect(dateCreatedNode.props.children).toEqual(dateCreated);
  });

  it('Renders the correct content for the first element', () => {
    const contentNode = wrapper
      .find('.container-result-row-content')
      .first()
      .getElement();
    expect(contentNode).toBeDefined();
    expect(contentNode.props.children).toEqual(content);
  });

  it('Renders the correct tags for the first element', () => {
    const tagsNode = wrapper
      .find('.container-result-row-tags')
      .first()
      .getElement();
    expect(tagsNode).toBeDefined();

    const tags = ['#percent ', '#experiment '];

    expect(tagsNode.props.children.props.children).toEqual(tags);
  });
});
