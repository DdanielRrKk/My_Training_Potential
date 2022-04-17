import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import MainHomeScreen from '../screens/home/mainHomeScreen';
import MainWorkoutScreen from '../screens/workout/mainWorkoutScreen';
import MainMealScreen from '../screens/meal/mainMealScreen';
import MainLearnScreen from '../screens/learn/mainLearnScreen';

const Tab = createBottomTabNavigator();

import { PRIMARY_COLOR } from '../styles/colors';



export default function TabNavigation() {
    return(
        <Tab.Navigator initialRouteName='MainHomeScreen'>
            <Tab.Screen 
                name='MainHomeScreen' 
                component={MainHomeScreen} 
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused, color}) => (
                        <Octicons name="home" size={24} color={(focused) ? PRIMARY_COLOR : color} />
                    ),
                }}/>
            <Tab.Screen 
                name='MainWorkoutScreen' 
                component={MainWorkoutScreen} 
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused, color}) => (
                        <MaterialCommunityIcons name="dumbbell" size={24} color={(focused) ? PRIMARY_COLOR : color} />
                    ),
                }}/>
            <Tab.Screen 
                name='MainMealScreen' 
                component={MainMealScreen} 
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused, color}) => (
                        <MaterialCommunityIcons name="food-apple-outline" size={24} color={(focused) ? PRIMARY_COLOR : color} />
                    ),
                }}/>
            <Tab.Screen 
                name='MainLearnScreen' 
                component={MainLearnScreen} 
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused, color}) => (
                        <MaterialCommunityIcons name="book-open-variant" size={24} color={(focused) ? PRIMARY_COLOR : color} />
                    ),
                }}/>
        </Tab.Navigator>
    );
}