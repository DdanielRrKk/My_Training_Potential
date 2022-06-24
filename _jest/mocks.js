import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);



import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');



jest.mock('@react-navigation/native');
jest.mock('@react-navigation/stack', () => {
  const actualNav = jest.requireActual("@react-navigation/stack");
  return {
    ...actualNav,
    createStackNavigator: () => ({
      navigate: jest.fn()
    }),
  };
});
jest.mock("@react-navigation/bottom-tabs", () => {
  const actualNav = jest.requireActual("@react-navigation/bottom-tabs");
  return {
    ...actualNav,
    createBottomTabNavigator: () => ({
      navigate: jest.fn()
    }),
  };
});
