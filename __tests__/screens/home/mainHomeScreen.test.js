import React from 'react';
import renderer from 'react-test-renderer';

import MainHomeScreen from '../../../screens/home/mainHomeScreen';



describe('<MainHomeScreen />', () => {
  jest.useFakeTimers();

  it('has 1 child', async () => {
    const tree = await renderer.create(<MainHomeScreen />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  it('renders correctly', async () => {
    const tree = await renderer.create(<MainHomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('renders correctly', async () => {
  //   let tree;
    
  //   await renderer.act(async () => { tree = renderer.create(<MainHomeScreen />); });

  //   expect(tree.toJSON()).toMatchSnapshot();
  // });
});
