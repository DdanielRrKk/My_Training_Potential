import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const NavStack = createStackNavigator();

import TabNavigation from './tabNavigation';
import AddMealScreen from '../../screens/meal/addMealScreen';



export default function MainNavigation() {
    return (
        <NavigationContainer>
            <NavStack.Navigator initialRouteName='TabNavigation'>
                <NavStack.Screen name='TabNavigation' component={TabNavigation} options={{ headerMode: 'none' }}/>
            
                <NavStack.Screen name='AddMealScreen' component={AddMealScreen} options={{ headerMode: 'none' }}/>
            </NavStack.Navigator>
        </NavigationContainer>
    );
}