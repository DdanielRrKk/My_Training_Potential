import React from 'react';
import renderer from 'react-test-renderer';

import MainWorkoutScreen from '../../../screens/workout/mainWorkoutScreen';



describe('<MainWorkoutScreen />', () => {
  jest.useFakeTimers();

  it('has 1 child', async () => {
    const tree = await renderer.create(<MainWorkoutScreen />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  it('renders correctly', async () => {
    const tree = await renderer.create(<MainWorkoutScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('renders correctly', async () => {
  //   let tree;
    
  //   await renderer.act(async () => { tree = renderer.create(<MainWorkoutScreen />); });

  //   expect(tree.toJSON()).toMatchSnapshot();
  // });
});
