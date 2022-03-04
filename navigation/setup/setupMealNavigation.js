import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const NavStack = createStackNavigator();

import SetupMealGoalScreen from '../../screens/meal/setup/setupMealGoalScreen';
import SetupMealActivityScreen from '../../screens/meal/setup/setupMealActivityScreen';
import SetupMealResultsScreen from '../../screens/meal/setup/setupMealResultsScreen';



export default function SetupMealNavigation() {
    return (
        <NavStack.Navigator initialRouteName='SetupMealGoalScreen'>
            <NavStack.Screen name='SetupMealGoalScreen' component={SetupMealGoalScreen} options={{ headerMode: 'none' }}/>
            <NavStack.Screen name='SetupMealActivityScreen' component={SetupMealActivityScreen} options={{ headerMode: 'none' }}/>
            <NavStack.Screen name='SetupMealResultsScreen' component={SetupMealResultsScreen} options={{ headerMode: 'none' }}/>
        </NavStack.Navigator>
    );
}