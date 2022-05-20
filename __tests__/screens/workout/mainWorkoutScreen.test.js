import React from 'react';
import renderer from 'react-test-renderer';

import MainWorkoutScreen from '../../../screens/workout/mainWorkoutScreen';



describe('<MainWorkoutScreen />', () => {
  jest.useFakeTimers();

  it('has 1 child', async () => {
    const tree = renderer.create(<MainWorkoutScreen />).toJSON();
    await renderer.act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(tree.children.length).toBe(1);
  });

  it('renders correctly', async () => {
    const tree = renderer.create(<MainWorkoutScreen />).toJSON();
    await renderer.act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(tree).toMatchSnapshot();
  });

  // it('renders correctly 2', async () => {
  //   const { getByTestId, asFragment } = renderer.render(<MainWorkoutScreen />);
  //   const tree = await renderer.waitForElement(() => getByTestId());
  //   expect(tree.children).toHaveLength(2);
  //   expect(asFragment()).toMatchSnapshot();
  // });

  /*
  const listNode = await waitForElement(() => getByTestId('list'));
  expect(listNode.children).toHaveLength(2);
  expect(asFragment()).toMatchSnapshot();
  */
});
