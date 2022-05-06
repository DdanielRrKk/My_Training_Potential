import React from 'react';
import renderer from 'react-test-renderer';

import App from '../../App';



describe('<App />', () => {
  jest.useFakeTimers();

  it('has 1 child', async () => {
    const tree = await renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
