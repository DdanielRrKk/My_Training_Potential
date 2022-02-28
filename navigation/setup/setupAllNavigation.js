import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const NavStack = createStackNavigator();

import TabNavigation from '../main/tabNavigation';

import SetupMealGoalScreen from '../../screens/meal/setup/setupMealGoalScreen';
import SetupMealActivityScreen from '../../screens/meal/setup/setupMealActivityScreen';
import SetupMealResultsScreen from '../../screens/meal/setup/setupMealResultsScreen';
import AddMealScreen from '../../screens/meal/addMealScreen';


export default function SetupAllNavigation() {
    return (
        <NavigationContainer>
            <NavStack.Navigator initialRouteName='TabNavigation'>
                <NavStack.Screen name='TabNavigation' component={TabNavigation} options={{ headerMode: 'none' }}/>

                <NavStack.Screen name='SetupMealGoalScreen' component={SetupMealGoalScreen} options={{ headerMode: 'none' }}/>
                <NavStack.Screen name='SetupMealActivityScreen' component={SetupMealActivityScreen} options={{ headerMode: 'none' }}/>
                <NavStack.Screen name='SetupMealResultsScreen' component={SetupMealResultsScreen} options={{ headerMode: 'none' }}/>

                <NavStack.Screen name='AddMealScreen' component={AddMealScreen} options={{ headerMode: 'none' }}/>
            </NavStack.Navigator>
        </NavigationContainer>
    );
}