import { StyleSheet, Text, View } from 'react-native';

import LandingNavigation from './navigation/landing/landingNavigation';



export default function App() {
  return (
    <LandingNavigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
