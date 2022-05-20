import React from 'react';
import renderer from 'react-test-renderer';

import MainMealScreen from '../../../screens/meal/mainMealScreen';



describe('<MainMealScreen />', () => {
  jest.useFakeTimers();

  it('has 1 child', async () => {
    const tree = renderer.create(<MainMealScreen />).toJSON();
    await renderer.act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(tree.children.length).toBe(1);
  });

  it('renders correctly', async () => {
    const tree = renderer.create(<MainMealScreen />).toJSON();
    await renderer.act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(tree).toMatchSnapshot();
  });
});
