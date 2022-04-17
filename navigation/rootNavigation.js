import React from 'react';
import { DeviceEventEmitter } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const NavStack = createStackNavigator();

import LoadingScreen from '../screens/loadingScreen';

import LandingScreen from '../screens/landing/landingScreen';
import LandingNameScreen from '../screens/landing/landingNameScreen';
import LandingGenderScreen from '../screens/landing/landingGenderScreen';
import LandingMeasurementsScreen from '../screens/landing/landingMeasurementsScreen';

import TabNavigation from './tabNavigation';
import WeightScreen from '../screens/home/weightScreen';
import MealLogsScreen from '../screens/home/mealLogsScreen';
import WorkoutLogsScreen from '../screens/home/workoutLogScreen';
import OpenMealLogScreen from '../screens/home/openMealLogScreen';
import OpenWorkoutLogScreen from '../screens/home/openWorkoutLogScreen';

import MainSettingsScreen from '../screens/home/settings/mainSettings';
import EditUserDataScreen from '../screens/home/settings/editUserDataScreen';
import EditMealDataScreen from '../screens/home/settings/editMealDataScreen';

import SetupMealGoalScreen from '../screens/meal/setup/setupMealGoalScreen';
import SetupMealActivityScreen from '../screens/meal/setup/setupMealActivityScreen';
import SetupMealResultsScreen from '../screens/meal/setup/setupMealResultsScreen';

import AddMealScreen from '../screens/meal/addMealScreen';
import SingleMealScreen from '../screens/meal/singleMealScreen';

import SetupWorkoutPlanScreen from '../screens/workout/setup/setupWorkoutPlanScreen';
import SetupWorkoutDayScreen from '../screens/workout/setup/setupWorkoutDayScreen';
import SetupWorkoutExerciseScreen from '../screens/workout/setup/setupWorkoutExerciseScreen';

import OpenWorkoutScreen from '../screens/workout/openWorkoutScreen';
import StartWorkoutScreen from '../screens/workout/startWorkoutScreen';
import TimeWorkoutScreen from '../screens/workout/timeWorkoutScreen';
import FinalWorkoutScreen from '../screens/workout/finalWorkoutScreen';


import { GetAppFlagsData, SaveDataIfDayChanged } from '../database/screen/app_serices';



export default function RootNavigation() {
  const [allGood, setAllGood] = React.useState(false);
  const [isUserReady, setIsUserReady] = React.useState(false);
  const [isMealReady, setIsMealReady] = React.useState(false);
  const [isWorkoutReady, setIsWorkoutReady] = React.useState(false);

  React.useEffect(() => {
    let isGood = true;
    
    DeviceEventEmitter.addListener('event.userReady', ({flag}) => setIsUserReady(flag));
    DeviceEventEmitter.addListener('event.mealReady', ({flag}) => setIsMealReady(flag));
    DeviceEventEmitter.addListener('event.workoutReady', ({flag}) => setIsWorkoutReady(flag));
    
    GetAppFlagsData().then(({isUserReady, isMealReady, isWorkoutReady}) => { 
      if(isGood) {
        setIsUserReady(isUserReady);
        setIsMealReady(isMealReady);
        setIsWorkoutReady(isWorkoutReady);
        setAllGood(true);
        if(isMealReady) SaveDataIfDayChanged();
      }
    });

    return () => {  
      isGood = false; 
      DeviceEventEmitter.removeListener('event.userReady');
      DeviceEventEmitter.removeListener('event.mealReady');
      DeviceEventEmitter.removeListener('event.workoutReady');
    } // to prevent memory leaks (clean up)
  }, [isUserReady, isMealReady, isWorkoutReady]);

  const Tabs = () => TabNavigation();

  // console.log('systemFlags root', systemFlags);
  
  console.log('isUserReady root', isUserReady);
  console.log('isMealReady root', isMealReady);
  console.log('isWorkoutReady root', isWorkoutReady);

  if(!allGood) {
    return (
      <LoadingScreen />
    );
  }

  if(!isUserReady && allGood) {
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
        <NavStack.Screen name='MealLogsScreen' component={MealLogsScreen} options={{ headerMode: 'none' }} />
        <NavStack.Screen name='WorkoutLogsScreen' component={WorkoutLogsScreen} options={{ headerMode: 'none' }} />
        <NavStack.Screen name='OpenMealLogScreen' component={OpenMealLogScreen} options={{ headerMode: 'none' }} />
        <NavStack.Screen name='OpenWorkoutLogScreen' component={OpenWorkoutLogScreen} options={{ headerMode: 'none' }} />
        
        <NavStack.Screen name='MainSettingsScreen' component={MainSettingsScreen} options={{ headerMode: 'none' }} />
        <NavStack.Screen name='EditUserDataScreen' component={EditUserDataScreen} options={{ headerMode: 'none' }} />
        <NavStack.Screen name='EditMealDataScreen' component={EditMealDataScreen} options={{ headerMode: 'none' }} />
        
        <NavStack.Screen name='SetupMealGoalScreen' component={SetupMealGoalScreen} options={{ headerMode: 'none' }} />
        <NavStack.Screen name='SetupMealActivityScreen' component={SetupMealActivityScreen} options={{ headerMode: 'none' }} />
        <NavStack.Screen name='SetupMealResultsScreen' component={SetupMealResultsScreen} options={{ headerMode: 'none' }} />

        <NavStack.Screen name='SetupWorkoutPlanScreen' component={SetupWorkoutPlanScreen} options={{ headerMode: 'none' }} />
        <NavStack.Screen name='SetupWorkoutDayScreen' component={SetupWorkoutDayScreen} options={{ headerMode: 'none' }} />
        <NavStack.Screen name='SetupWorkoutExerciseScreen' component={SetupWorkoutExerciseScreen} options={{ headerMode: 'none' }} />

        <NavStack.Screen name='AddMealScreen' component={AddMealScreen} options={{ headerMode: 'none' }} />
        <NavStack.Screen name='SingleMealScreen' component={SingleMealScreen} options={{ headerMode: 'none' }} />

        <NavStack.Screen name='OpenWorkoutScreen' component={OpenWorkoutScreen} options={{ headerMode: 'none' }} />
        <NavStack.Screen name='StartWorkoutScreen' component={StartWorkoutScreen} options={{ headerMode: 'none' }} />
        <NavStack.Screen name='TimeWorkoutScreen' component={TimeWorkoutScreen} options={{ headerMode: 'none' }} />
        <NavStack.Screen name='FinalWorkoutScreen' component={FinalWorkoutScreen} options={{ headerMode: 'none' }} />
      </NavStack.Navigator>
    </NavigationContainer>
  );
}
