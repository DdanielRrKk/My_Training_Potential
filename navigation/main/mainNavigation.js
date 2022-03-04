import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const NavStack = createStackNavigator();

import TabNavigation from './tabNavigation';
import AddMealScreen from '../../screens/meal/addMealScreen';
import SingleMealScreen from '../../screens/meal/singleMealScreen';
import SetupMealGoalScreen from '../../screens/meal/setup/setupMealGoalScreen';
import SetupMealActivityScreen from '../../screens/meal/setup/setupMealActivityScreen';
import SetupMealResultsScreen from '../../screens/meal/setup/setupMealResultsScreen';



export default function MainNavigation(isMealReady) {
    return (
        <NavigationContainer>
            <NavStack.Navigator initialRouteName='TabNavigation'>
                <NavStack.Screen name='TabNavigation' component={TabNavigation} options={{ headerMode: 'none' }}/>
                
                {isMealReady 
                ? 
                <>
                    <NavStack.Screen name='SetupMealGoalScreen' component={SetupMealGoalScreen} options={{ headerMode: 'none' }}/>
                    <NavStack.Screen name='SetupMealActivityScreen' component={SetupMealActivityScreen} options={{ headerMode: 'none' }}/>
                    <NavStack.Screen name='SetupMealResultsScreen' component={SetupMealResultsScreen} options={{ headerMode: 'none' }}/>
                </>
                : 
                null }

                <NavStack.Screen name='AddMealScreen' component={AddMealScreen} options={{ headerMode: 'none' }}/>
                <NavStack.Screen name='SingleMealScreen' component={SingleMealScreen} options={{ headerMode: 'none' }}/>
            </NavStack.Navigator>
        </NavigationContainer>
    );
}