import React from 'react';
import renderer from 'react-test-renderer';

import MainMealScreen from '../../../screens/meal/mainMealScreen';



describe('<MainMealScreen />', () => {
  jest.useFakeTimers();

  it('has 1 child', async () => {
    const tree = await renderer.create(<MainMealScreen />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  it('renders correctly', async () => {
    const tree = await renderer.create(<MainMealScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('renders correctly', async () => {
  //   let tree;
    
  //   await renderer.act(async () => { tree = renderer.create(<MainMealScreen />); });

  //   expect(tree.toJSON()).toMatchSnapshot();
  // });
});
