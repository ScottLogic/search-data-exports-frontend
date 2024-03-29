import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from './Header';

Enzyme.configure({ adapter: new Adapter() });

describe('<Header />', () => {
  let wrapper;

  const appProps = {
    updateModalDisplayed: jest.fn()
  };

  beforeEach(() => {
    wrapper = shallow(<Header {...appProps} />);
  });

  it('Renders the title', () => {
    expect(wrapper.find('.title-header')).toBeDefined();
  });

  it('Renders the email prop', () => {
    const emailNode = wrapper.find('.email-header');
    expect(emailNode).toBeDefined();
  });
});
