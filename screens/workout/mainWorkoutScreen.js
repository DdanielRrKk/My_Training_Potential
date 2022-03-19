import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

import { useIsFocused  } from '@react-navigation/native';

import { getCurrentWorkoutDay, getWorkoutDaysWithoutToday } from '../../helpers/workoutHelper';

import { container } from '../../styles/miscStyles';

import WorkoutBox from '../../components/workout/workoutBox';

import { GetWorkoutScreenData } from '../../database/screen/workout/main_workout_services';



export default function MainWorkoutScreen({ navigation, route }){
    const [isWorkoutReady, setIsWorkoutReady] = React.useState(null);
    
    const [name, setName] = React.useState(null);
    const [days, setDays] = React.useState([
        {day_number: 1, name: null, exercises: []},
        {day_number: 2, name: null, exercises: []},
        {day_number: 3, name: null, exercises: []},
        {day_number: 4, name: null, exercises: []},
        {day_number: 5, name: null, exercises: []},
        {day_number: 6, name: null, exercises: []},
        {day_number: 7, name: null, exercises: []},
    ]);
    
    const [currentDay, setCurrentDay] = React.useState(null);


    React.useEffect(() => {
        console.log('route.params?.isWorkoutReady', route.params?.isWorkoutReady);
        if(route.params?.isWorkoutReady) setIsWorkoutReady(route.params?.isWorkoutReady);
    }, [route.params?.isWorkoutReady]);

    const focus = useIsFocused();
    React.useEffect(() => {
        let isGood = true;
        console.log('focus workout', focus);

        GetWorkoutScreenData().then(({ name, days}) => { 
            if(isGood) {
                setName(name);
                setDays(getWorkoutDaysWithoutToday(days));
                setCurrentDay(getCurrentWorkoutDay(days));
            }
        });

        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, [
        focus, 
        isWorkoutReady,
        name,
        days
    ]);

    
    console.log('isWorkoutReady workout', isWorkoutReady);
    console.log('days workout', days);
    console.log('currentDay workout', currentDay);

    const openSetupScreen = () => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('SetupWorkoutPlanScreen');
    }

    if(!isWorkoutReady || isWorkoutReady == null) {
        return(
            <SafeAreaView style={container}>
                <TouchableOpacity 
                    style={styles.setUp}
                    onPress={openSetupScreen}>
                    <Text>Set Up Plan</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const openStartWorkoutScreen = () => {
        console.log('start day', currentDay);
    }
    const openWorkoutScreen = () => {
        console.log('open workout screen');
    }

    return(
        <SafeAreaView style={container}>
            <View style={styles.header}>
                <Text style={styles.primaryText}>{name}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.subtitle}>Today</Text>

                <WorkoutBox 
                    day={currentDay}
                    isToday={true}
                    startHandler={openStartWorkoutScreen}
                    openHandler={openWorkoutScreen}/>
                
                <Text style={styles.subtitle}>Next days</Text>

                <WorkoutBox 
                    day={days[0]}
                    isToday={false}
                    startHandler={openStartWorkoutScreen}
                    openHandler={openWorkoutScreen}/>
                    
                <WorkoutBox 
                    day={days[1]}
                    isToday={false}
                    startHandler={openStartWorkoutScreen}
                    openHandler={openWorkoutScreen}/>
                    
                <WorkoutBox 
                    day={days[2]}
                    isToday={false}
                    startHandler={openStartWorkoutScreen}
                    openHandler={openWorkoutScreen}/>

                <WorkoutBox 
                    day={days[3]}
                    isToday={false}
                    startHandler={openStartWorkoutScreen}
                    openHandler={openWorkoutScreen}/>

                <WorkoutBox 
                    day={days[4]}
                    isToday={false}
                    startHandler={openStartWorkoutScreen}
                    openHandler={openWorkoutScreen}/>

                <WorkoutBox 
                    day={days[5]}
                    isToday={false}
                    startHandler={openStartWorkoutScreen}
                    openHandler={openWorkoutScreen}/>
            </View>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    setUp: {
        backgroundColor: 'gray',
        width: '100%',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center'
    },

    header: {
        backgroundColor: 'gray',
        width: '100%',
        padding: 20,
        borderRadius: 10
    },

    infoBox: {
        alignItems: 'center',
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
    },

    primaryText: {
        fontSize: 24
    },

    secondaryText: {
        fontSize: 18
    },

    subText: {
        fontSize: 14
    },

    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    subtitle: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        fontSize: 18,
        paddingVertical: 16
    },
});