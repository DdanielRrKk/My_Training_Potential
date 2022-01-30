import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const NavStack = createStackNavigator();

import TabNavigation from './tabNavigation';



export default function MainNavigation() {
    return (
        <NavigationContainer>
            <NavStack.Navigator initialRouteName='TabNavigation'>
                <NavStack.Screen name='TabNavigation' component={TabNavigation} options={{ headerMode: 'none' }}/>
            </NavStack.Navigator>
        </NavigationContainer>
    );
}