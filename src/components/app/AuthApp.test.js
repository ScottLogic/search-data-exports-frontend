import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AuthApp from './AuthApp';

Enzyme.configure({ adapter: new Adapter() });

describe('<AuthApp />', () => {
  it('renders without crashing', () => {
    shallow(<AuthApp />);
  });
});
