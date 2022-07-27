import React from 'react';
import { DeviceEventEmitter } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const { Navigator, Screen } = createStackNavigator();

import LoadingScreen from '../screens/loadingScreen';

import LandingScreen from '../screens/landing/landingScreen';
import LandingNameScreen from '../screens/landing/landingNameScreen';
import LandingGenderScreen from '../screens/landing/landingGenderScreen';
import LandingMeasurementsScreen from '../screens/landing/landingMeasurementsScreen';

import TabNavigation from './tabNavigation';
import WeightScreen from '../screens/home/weightScreen';
import StepsScreen from '../screens/home/stepsScreen';
import MealLogsScreen from '../screens/home/mealLogsScreen';
import WorkoutLogsScreen from '../screens/home/workoutLogScreen';
import OpenMealLogScreen from '../screens/home/openMealLogScreen';
import OpenWorkoutLogScreen from '../screens/home/openWorkoutLogScreen';

import MainSettingsScreen from '../screens/home/settings/mainSettingsScreen';
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

import CalculatorScreen from '../screens/learn/calculatorScreen';


import { SaveMealDataIfDayChanged, SaveStepsDataIfDayChanged, GetAppState } from '../database/screen/app_serices';

import { SYSTEM_USER_AND_MEAL_SETUP, SYSTEM_ALL_SETUP } from '../helpers/constants';



export default function RootNavigation() {
  const [changeUpdater, setChangeUpdater] = React.useState(false);
  const [allGood, setAllGood] = React.useState(false);
  const [systemState, setSystemState] = React.useState(null);

  // console.log('root good');

  React.useEffect(() => {
    let isGood = true;
    
    DeviceEventEmitter.addListener('event.stateUpdate', ({falg}) => setChangeUpdater(falg));

    GetAppState().then((state) => {
      if(isGood) {
        setSystemState(state);
        setAllGood(true);
        setChangeUpdater(false);
        // console.log('root good in');
        SaveStepsDataIfDayChanged();
        if(state == SYSTEM_USER_AND_MEAL_SETUP || state == SYSTEM_ALL_SETUP) SaveMealDataIfDayChanged();
      }
    });

    return () => {  
      isGood = false; 
      DeviceEventEmitter.removeListener('event.stateUpdate');
    } // to prevent memory leaks (clean up)
  }, [changeUpdater]);

  const Tabs = () => TabNavigation();  
  
  // console.log('systemState root', systemState);

  if(!allGood || systemState == null) {
    return (
      <LoadingScreen />
    );
  }

  if(systemState == 0) {
    return (
      <NavigationContainer>
        <Navigator initialRouteName='LandingScreen'>
          <Screen name='LandingScreen' component={LandingScreen} options={{ headerMode: 'none' }} />
          <Screen name='LandingNameScreen' component={LandingNameScreen} options={{ headerMode: 'none' }} />
          <Screen name='LandingGenderScreen' component={LandingGenderScreen} options={{ headerMode: 'none' }} />
          <Screen name='LandingMeasurementsScreen' component={LandingMeasurementsScreen} options={{ headerMode: 'none' }} />
        </Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Navigator initialRouteName='TabNavigation'>
        <Screen name='TabNavigation' component={Tabs} options={{ headerMode: 'none' }} />
        <Screen name='WeightScreen' component={WeightScreen} options={{ headerMode: 'none' }} />
        <Screen name='StepsScreen' component={StepsScreen} options={{ headerMode: 'none' }} />
        <Screen name='MealLogsScreen' component={MealLogsScreen} options={{ headerMode: 'none' }} />
        <Screen name='WorkoutLogsScreen' component={WorkoutLogsScreen} options={{ headerMode: 'none' }} />
        <Screen name='OpenMealLogScreen' component={OpenMealLogScreen} options={{ headerMode: 'none' }} />
        <Screen name='OpenWorkoutLogScreen' component={OpenWorkoutLogScreen} options={{ headerMode: 'none' }} />
        
        <Screen name='MainSettingsScreen' component={MainSettingsScreen} options={{ headerMode: 'none' }} />
        <Screen name='EditUserDataScreen' component={EditUserDataScreen} options={{ headerMode: 'none' }} />
        <Screen name='EditMealDataScreen' component={EditMealDataScreen} options={{ headerMode: 'none' }} />
        
        <Screen name='SetupMealGoalScreen' component={SetupMealGoalScreen} options={{ headerMode: 'none' }} />
        <Screen name='SetupMealActivityScreen' component={SetupMealActivityScreen} options={{ headerMode: 'none' }} />
        <Screen name='SetupMealResultsScreen' component={SetupMealResultsScreen} options={{ headerMode: 'none' }} />

        <Screen name='SetupWorkoutPlanScreen' component={SetupWorkoutPlanScreen} options={{ headerMode: 'none' }} />
        <Screen name='SetupWorkoutDayScreen' component={SetupWorkoutDayScreen} options={{ headerMode: 'none' }} />
        <Screen name='SetupWorkoutExerciseScreen' component={SetupWorkoutExerciseScreen} options={{ headerMode: 'none' }} />

        <Screen name='AddMealScreen' component={AddMealScreen} options={{ headerMode: 'none' }} />
        <Screen name='SingleMealScreen' component={SingleMealScreen} options={{ headerMode: 'none' }} />

        <Screen name='OpenWorkoutScreen' component={OpenWorkoutScreen} options={{ headerMode: 'none' }} />
        <Screen name='StartWorkoutScreen' component={StartWorkoutScreen} options={{ headerMode: 'none' }} />
        <Screen name='TimeWorkoutScreen' component={TimeWorkoutScreen} options={{ headerMode: 'none' }} />
        <Screen name='FinalWorkoutScreen' component={FinalWorkoutScreen} options={{ headerMode: 'none' }} />

        <Screen name='CalculatorScreen' component={CalculatorScreen} options={{ headerMode: 'none' }} />
      </Navigator>
    </NavigationContainer>
  );
}
