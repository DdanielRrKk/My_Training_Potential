import React from 'react';
import renderer from 'react-test-renderer';

import MainHomeScreen from '../../../screens/home/mainHomeScreen';



describe('<MainHomeScreen />', () => {
  jest.useFakeTimers();

  it('has 1 child', async () => {
    const tree = renderer.create(<MainHomeScreen />).toJSON();
    await renderer.act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(tree.children.length).toBe(1);
  });

  it('renders correctly', async () => {
    const tree = renderer.create(<MainHomeScreen />).toJSON();
    await renderer.act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(tree).toMatchSnapshot();
  });
});
