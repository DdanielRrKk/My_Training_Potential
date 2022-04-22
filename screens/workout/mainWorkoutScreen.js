import React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import LoadingScreen from '../loadingScreen';

import { GetAppState } from '../../database/screen/app_serices';
import { GetWorkoutScreenData } from '../../database/screen/workout/main_workout_services';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesWorkout } from '../../styles/workoutStyles';

import WorkoutBox from '../../components/workout/workoutBox';
import Header from '../../components/misc/header';
import SetupButtonView from '../../components/misc/setup/setupButtonView';

import { getSortedWorkoutDays } from '../../helpers/workoutHelper';
import { 
    SYSTEM_USER_AND_WORKOUT_SETUP,
    SYSTEM_ALL_SETUP
} from '../../helpers/constants';



export default function MainWorkoutScreen({ navigation }){
    const [systemState, setSystemState] = React.useState(null);
    const [isWorkoutSetup, setIsWorkoutSetup] = React.useState(false);

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

    console.log('name', name);
    console.log('days', days);

    const focus = useIsFocused();
    React.useEffect(() => {
        let isGood = true;

        GetAppState().then((state) => {
            setSystemState(state);

            setIsWorkoutSetup(state == SYSTEM_USER_AND_WORKOUT_SETUP || state == SYSTEM_ALL_SETUP);

            if(state == SYSTEM_USER_AND_WORKOUT_SETUP || state == SYSTEM_ALL_SETUP) {
                GetWorkoutScreenData().then(({ name, days}) => { 
                    if(isGood) {
                        setName(name);
                        const tempArray = getSortedWorkoutDays(days);
                        setDays(tempArray);
                    }
                });
            }
    
        });

        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, [focus, name]);

    if(systemState == null) {
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
        navigation.navigate('StartWorkoutScreen', {exercises: days[0].exercises, day_name: days[0].name});
    }
    const openWorkoutScreen = (day_number) => {
        navigation.setOptions({ tabBarVisible: false });
        navigation.navigate('OpenWorkoutScreen', {day_number: day_number});
    }

    return(
        <SafeAreaView style={stylesWorkout.container}>
            <ScrollView style={stylesMisc.scrollContent} showsVerticalScrollIndicator={false}>
                <Header title={name}/>

                <View style={stylesMisc.content_start}>
                    <Text style={stylesMisc.subtitle}>Today</Text>

                    <WorkoutBox 
                        day={days[0]}
                        isToday={true}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(days[0].day_number)}/>
                    
                    <Text style={stylesMisc.subtitle}>Next days</Text>

                    <WorkoutBox 
                        style={{marginBottom: 16}}
                        day={days[1]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(days[1].day_number)}/>
                        
                    <WorkoutBox 
                        style={stylesWorkout.box_margin}
                        day={days[2]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(days[2].day_number)}/>
                        
                    <WorkoutBox 
                        style={stylesWorkout.box_margin}
                        day={days[3]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(days[3].day_number)}/>

                    <WorkoutBox 
                        style={stylesWorkout.box_margin}
                        day={days[4]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(days[4].day_number)}/>

                    <WorkoutBox 
                        style={stylesWorkout.box_margin}
                        day={days[5]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(days[5].day_number)}/>

                    <WorkoutBox 
                        style={stylesWorkout.box_margin}
                        day={days[6]}
                        isToday={false}
                        startHandler={openStartWorkoutScreen}
                        openHandler={() => openWorkoutScreen(days[6].day_number)}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
