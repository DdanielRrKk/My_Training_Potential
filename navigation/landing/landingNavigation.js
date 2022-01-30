import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const NavStack = createStackNavigator();

import LandingScreen from '../../screens/landing/landingScreen';
import LandingNameScreen from '../../screens/landing/landingNameScreen';
import LandingGenderScreen from '../../screens/landing/landingGenderScreen';
import LandingMeasurementsScreen from '../../screens/landing/landingMeasurementsScreen';



export default function LandingNavigation({ dataReady }) {
    return (
        <NavigationContainer>
            <NavStack.Navigator initialRouteName='LandingScreen'>
                <NavStack.Screen name='LandingScreen' component={LandingScreen} options={{ headerMode: 'none' }}/>
                <NavStack.Screen name='LandingNameScreen' component={LandingNameScreen} options={{ headerMode: 'none' }}/>
                <NavStack.Screen name='LandingGenderScreen' component={LandingGenderScreen} options={{ headerMode: 'none' }}/>
                <NavStack.Screen name='LandingMeasurementsScreen' component={LandingMeasurementsScreen} options={{ headerMode: 'none' }} initialParams={{dataReady: dataReady}}/>
            </NavStack.Navigator>
        </NavigationContainer>
    );
}