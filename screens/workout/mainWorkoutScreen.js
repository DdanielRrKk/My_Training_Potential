import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

import { GetWorkoutScreenData } from '../../database/screen/workout/main_workout_services';

import { container, shadow, subtitle } from '../../styles/miscStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../styles/colors';

import WorkoutBox from '../../components/workout/workoutBox';

import { useSystemFlagsGlobal } from '../../helpers/globalState';
import { getSortedWorkoutDays } from '../../helpers/workoutHelper';



export default function MainWorkoutScreen({ navigation, route }){
    const [systemFlags, setSystemFlags] = useSystemFlagsGlobal();

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
    
    // console.log('systemFlags workout', systemFlags);

    React.useEffect(() => {
        let isGood = true;

        GetWorkoutScreenData().then(({ name, days}) => { 
            if(isGood) {
                setName(name);
                const tempArray = getSortedWorkoutDays(days);
                setDays(tempArray);
            }
        });

        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, [name]);


    const openSetupScreen = () => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('SetupWorkoutPlanScreen');
    }

    if(!systemFlags.isWorkoutReady || systemFlags == null) {
        return(
            <SafeAreaView style={container}>
                <TouchableOpacity 
                    style={styles.setUp}
                    onPress={openSetupScreen}>
                    <Text style={styles.setupText}>Set Up Plan</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const openStartWorkoutScreen = () => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('StartWorkoutScreen', {exercises: days[0].exercises, day_name: days[0].name});
    }
    const openWorkoutScreen = (day_number) => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('OpenWorkoutScreen', {day_number: day_number});
    }

    return(
        <SafeAreaView style={[container, {paddingVertical: 0}]}>
            <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                <View style={[styles.header, shadow]}>
                    <Text style={styles.headerText}>{name}</Text>
                </View>

                <View style={styles.content}>
                    <Text style={subtitle}>Today</Text>

                    <WorkoutBox 
                        day={days[0]}
                        isToday={true}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(days[0].day_number)}/>
                    
                    <Text style={subtitle}>Next days</Text>

                    <WorkoutBox 
                        style={{marginBottom: 16}}
                        day={days[1]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(days[1].day_number)}/>
                        
                    <WorkoutBox 
                        style={{marginBottom: 16}}
                        day={days[2]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(days[2].day_number)}/>
                        
                    <WorkoutBox 
                        style={{marginBottom: 16}}
                        day={days[3]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(days[3].day_number)}/>

                    <WorkoutBox 
                        style={{marginBottom: 16}}
                        day={days[4]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(days[4].day_number)}/>

                    <WorkoutBox 
                        style={{marginBottom: 16}}
                        day={days[5]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(days[5].day_number)}/>

                    <WorkoutBox 
                        style={{marginBottom: 16}}
                        day={days[6]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(days[6].day_number)}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    setUp: {
        backgroundColor: PRIMARY_COLOR,
        width: '100%',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center'
    },
    setupText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },

    header: {
        backgroundColor: PRIMARY_COLOR,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: 16,
        borderRadius: 10,
        height: 80
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },

    infoBox: {
        alignItems: 'center',
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
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
});