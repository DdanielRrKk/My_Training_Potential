import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const NavStack = createStackNavigator();

import LoadingScreen from '../screens/landing/loadingScreen';

import LandingScreen from '../screens/landing/landingScreen';
import LandingNameScreen from '../screens/landing/landingNameScreen';
import LandingGenderScreen from '../screens/landing/landingGenderScreen';
import LandingMeasurementsScreen from '../screens/landing/landingMeasurementsScreen';

import TabNavigation from './tabNavigation';
import WeightScreen from '../screens/home/weightScreen';

import MainSettingsScreen from '../screens/home/settings/mainSettings';

import SetupMealGoalScreen from '../screens/meal/setup/setupMealGoalScreen';
import SetupMealActivityScreen from '../screens/meal/setup/setupMealActivityScreen';
import SetupMealResultsScreen from '../screens/meal/setup/setupMealResultsScreen';

import AddMealScreen from '../screens/meal/addMealScreen';
import SingleMealScreen from '../screens/meal/singleMealScreen';

import SetupWorkoutPlanScreen from '../screens/workout/setup/setupWorkoutPlanScreen';
import SetupWorkoutDayScreen from '../screens/workout/setup/setupWorkoutDayScreen';
import SetupWorkoutExerciseScreen from '../screens/workout/setup/setupWorkoutExerciseScreen';


import { GetAppData, SaveDataIfDayChanged } from '../database/screen/app_serices';

import { useSystemFlagsGlobal } from '../helpers/globalState';



export default function RootNavigation() {
  const [systemFlags, setSystemFlags] = useSystemFlagsGlobal();

  React.useEffect(() => {
    let isGood = true;

    SaveDataIfDayChanged();
    
    GetAppData().then(({ isUserSetup, isMealSetup, isWorkoutSetup }) => { 
      if(isGood) {
        setSystemFlags({
          isUserReady: isUserSetup,
          isMealReady: isMealSetup,
          isWorkoutReady: isWorkoutSetup
        });
      }
    });

    return () => {  isGood = false; } // to prevent memory leaks (clean up)
  }, []);
  const Tabs = () => TabNavigation(systemFlags.isMealReady, systemFlags.isWorkoutReady);

  console.log('systemFlags root', systemFlags);

  if(systemFlags == null) {
    return (
      <LoadingScreen />
    );
  }

  if(!systemFlags.isUserReady) {
    return (
      <NavigationContainer>
        <NavStack.Navigator initialRouteName='LandingScreen'>
          <NavStack.Screen name='LandingScreen' component={LandingScreen} options={{ headerMode: 'none' }} />
          <NavStack.Screen name='LandingNameScreen' component={LandingNameScreen} options={{ headerMode: 'none' }} />
          <NavStack.Screen name='LandingGenderScreen' component={LandingGenderScreen} options={{ headerMode: 'none' }} />
          <NavStack.Screen name='LandingMeasurementsScreen' component={LandingMeasurementsScreen} options={{ headerMode: 'none' }} />
        </NavStack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <NavStack.Navigator initialRouteName='TabNavigation'>
        <NavStack.Screen name='TabNavigation' component={Tabs} options={{ headerMode: 'none' }} />
        <NavStack.Screen name='WeightScreen' component={WeightScreen} options={{ headerMode: 'none' }} />
        <NavStack.Screen name='MainSettingsScreen' component={MainSettingsScreen} options={{ headerMode: 'none' }} />
        
        {!systemFlags.isMealReady ?
          <>
            <NavStack.Screen name='SetupMealGoalScreen' component={SetupMealGoalScreen} options={{ headerMode: 'none' }} />
            <NavStack.Screen name='SetupMealActivityScreen' component={SetupMealActivityScreen} options={{ headerMode: 'none' }} />
            <NavStack.Screen name='SetupMealResultsScreen' component={SetupMealResultsScreen} options={{ headerMode: 'none' }} />
          </>
        : null}

        {!systemFlags.isWorkoutReady ?
          <>
            <NavStack.Screen name='SetupWorkoutPlanScreen' component={SetupWorkoutPlanScreen} options={{ headerMode: 'none' }} />
            <NavStack.Screen name='SetupWorkoutDayScreen' component={SetupWorkoutDayScreen} options={{ headerMode: 'none' }} />
            <NavStack.Screen name='SetupWorkoutExerciseScreen' component={SetupWorkoutExerciseScreen} options={{ headerMode: 'none' }} />
          </>
        : null}

        <NavStack.Screen name='AddMealScreen' component={AddMealScreen} options={{ headerMode: 'none' }} />
        <NavStack.Screen name='SingleMealScreen' component={SingleMealScreen} options={{ headerMode: 'none' }} />
      </NavStack.Navigator>
    </NavigationContainer>
  );
}
