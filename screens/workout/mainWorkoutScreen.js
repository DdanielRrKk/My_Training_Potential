import React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import LoadingScreen from '../loadingScreen';

import { GetWorkoutScreenData } from '../../database/screen/workout/main_workout_services';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesWorkout } from '../../styles/workoutStyles';

import WorkoutBox from '../../components/workout/workoutBox';
import Header from '../../components/misc/header';
import SetupButtonView from '../../components/misc/setup/setupButtonView';

import { getSortedWorkouts } from '../../helpers/workoutHelper';



export default function MainWorkoutScreen({ navigation }){
    // const [systemState, setSystemState] = React.useState(null);
    const [isWorkoutSetup, setIsWorkoutSetup] = React.useState(null);

    const [name, setName] = React.useState(null);
    const [workouts, setWorkouts] = React.useState([]);

    // console.log('name workout', name);
    // console.log('workouts workout', workouts);
    // console.log('isWorkoutSetup workout', isWorkoutSetup);

    const focus = useIsFocused();
    React.useEffect(() => {
        let isGood = true;

        GetWorkoutScreenData().then(({ current_workout, name, type, workouts, isWorkoutSetup}) => { 
            if(isGood) {
                if(!isWorkoutSetup) {
                    setIsWorkoutSetup(isWorkoutSetup);
                    return;
                }

                setName(name);
                const tempArray = getSortedWorkouts(workouts, type, current_workout);
                setWorkouts(tempArray);
                setIsWorkoutSetup(isWorkoutSetup);
            }
        });

        return () => { isGood = false; } // to prevent memory leaks (clean up)
    }, [focus, name, isWorkoutSetup]);


    if(isWorkoutSetup == null) {
        return(
            <LoadingScreen />
        );
    }


    const openSetupScreen = () => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('SetupWorkoutPlanScreen');
    }

    if(!isWorkoutSetup) {
        return(
            <SetupButtonView style={stylesMisc.container} pressHandler={openSetupScreen}/>
        );
    }

    const openStartWorkoutScreen = () => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('StartWorkoutScreen', {exercises: workouts[0].exercises, day_name: workouts[0].name});
    }

    const openWorkoutScreen = (day_number) => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('OpenWorkoutScreen', {
            name: workouts[day_number].name,
            exercises: workouts[day_number].exercises,
            isToday: (day_number == 0)
        });
    }

    return(
        <SafeAreaView style={stylesWorkout.container}>
            <ScrollView style={stylesMisc.scrollContent} showsVerticalScrollIndicator={false}>
                <Header title={name}/>

                <View style={stylesMisc.content_start}>
                    <Text style={stylesMisc.subtitle}>Today</Text>

                    <WorkoutBox 
                        day={workouts[0]}
                        isToday={true}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(0)}/>
                    
                    <Text style={stylesMisc.subtitle}>Next days</Text>

                    <WorkoutBox 
                        style={{marginBottom: 16}}
                        day={workouts[1]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(1)}/>
                        
                    <WorkoutBox 
                        style={stylesWorkout.box_margin}
                        day={workouts[2]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(2)}/>
                        
                    <WorkoutBox 
                        style={stylesWorkout.box_margin}
                        day={workouts[3]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(3)}/>

                    <WorkoutBox 
                        style={stylesWorkout.box_margin}
                        day={workouts[4]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(4)}/>

                    <WorkoutBox 
                        style={stylesWorkout.box_margin}
                        day={workouts[5]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(5)}/>

                    <WorkoutBox 
                        style={stylesWorkout.box_margin}
                        day={workouts[6]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(6)}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
