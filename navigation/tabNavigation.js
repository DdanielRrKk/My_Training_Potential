import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import MainHomeScreen from '../screens/home/mainHomeScreen';
import MainWorkoutScreen from '../screens/workout/mainWorkoutScreen';
import MainMealScreen from '../screens/meal/mainMealScreen';
import MainLearnScreen from '../screens/learn/mainLearnScreen';

const Tab = createBottomTabNavigator();



export default function TabNavigation(isMealReady, isWorkoutReady) {
    return(
        <Tab.Navigator initialRouteName='MainHomeScreen'>
            <Tab.Screen 
                name='MainHomeScreen' 
                component={MainHomeScreen} 
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({color}) => (
                        <Octicons name="home" size={24} color={color} />
                    ),
                }}
                initialParams={{
                    isMealReady: isMealReady, 
                    isWorkoutReady: isWorkoutReady
                }}/>
            <Tab.Screen 
                name='MainWorkoutScreen' 
                component={MainWorkoutScreen} 
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="dumbbell" size={24} color={color} />
                    ),
                }}
                initialParams={{
                    isWorkoutReady: isWorkoutReady
                }}/>
            <Tab.Screen 
                name='MainMealScreen' 
                component={MainMealScreen} 
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="food-apple-outline" size={24} color={color} />
                    ),
                }}
                initialParams={{
                    isMealReady: isMealReady
                }}/>
            <Tab.Screen 
                name='MainLearnScreen' 
                component={MainLearnScreen} 
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="book-open-variant" size={24} color={color} />
                    ),
                }}/>
        </Tab.Navigator>
    );
}