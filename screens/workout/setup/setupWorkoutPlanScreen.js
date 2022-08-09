import React from 'react';
import { Text, View, SafeAreaView, ScrollView, DeviceEventEmitter } from 'react-native';

import { SetWorkoutPlan } from '../../../database/screen/workout/workout_setup_services';
import { GetEditWorkoutDataScreenData } from '../../../database/screen/home/settings_services';

import { stylesMisc } from '../../../styles/miscStyles';
import { stylesWorkoutSetup } from '../../../styles/workoutStyles';

import BackButton from '../../../components/misc/backButton';
import GroupButton from '../../../components/misc/groupButton';
import SetupWorkoutBox from '../../../components/workout/setup/setupWorkoutBox';
import TextEntry from '../../../components/misc/textEntry';
import ActionButton from '../../../components/misc/actionButton';
import SetupWorkoutDayList from '../../../components/workout/setup/setupWorkoutDayList';
import SetupWorkoutAddButton from '../../../components/workout/setup/setupWorkoutAddButton';

import { IsInputTextValid } from '../../../helpers/validations';
import { AlertOK } from '../../../helpers/alerts';
import { 
    NAME_MAX_LENGTH,
    WORKOUT_WEEKLY_ARRAY,
    ALERT_WARNING_TITLE,
    ALERT_WORKOUT_PLAN_NAME_TEXT,
    ALERT_WORKOUT_PLAN_WORKOUTS_TEXT
} from '../../../helpers/constants';


// dobavi proverka za syzdawane bez da ima nikakwi trenirowka
// dobavi syzdavaneto na trenirowka
export default function SetupWorkoutPlanScreen({ navigation, route }){
    const [fromEdit, setFromEdit] = React.useState(false);
    
    const [name, setName] = React.useState('');
    const [type, setType] = React.useState(0);

    const [workoutsWeekly, setWorkoutsWeekly] = React.useState(WORKOUT_WEEKLY_ARRAY);
    const [workoutsPattern, setWorkoutsPattern] = React.useState([]);


    // console.log('workoutsWeekly', workoutsWeekly);
    // console.log('workoutsPattern', workoutsPattern);

    React.useEffect(() => {
        if(route.params?.workout && route.params?.type) {
            if(route.params?.type - 1 == 0) {
                workoutsWeekly[route.params?.workout.day_number - 1] = route.params?.workout;
                setWorkoutsWeekly([... workoutsWeekly]);
            }
            else {
                workoutsPattern[route.params?.workout.day_number - 1] = route.params?.workout;
                setWorkoutsPattern([... workoutsPattern]);
            }
        }

        if(route.params?.isFromEdit) {
            let isGood = true;

            GetEditWorkoutDataScreenData().then(({name, type, workouts }) => { 
                if(isGood) {
                    setName(name);
                    setType(type);
                    (type == 0) ? setWorkoutsWeekly(workouts) : setWorkoutsPattern(workouts);
                }
            });

            setFromEdit(true);

            return () => { isGood = false; } // to prevent memory leaks (clean up)
        }
        return () => {
            DeviceEventEmitter.removeListener('event.stateUpdate');
        }
    }, [route.params?.workout, route.params?.type, route.params?.isFromEdit]);


    const openPrevScreen = () => navigation.goBack();

    const openWorkoutDaysScreen = (number = 0) => {
        if(type == 0) {
            navigation.navigate('SetupWorkoutDayScreen', { 
                type: type + 1, 
                day_number: number,
                workout: workoutsWeekly[number - 1]
            });
        }
        else {
            if(number == 0) {
                navigation.navigate('SetupWorkoutDayScreen', { 
                    type: type + 1, 
                    day_number: workoutsPattern.length + 1,
                    workout: null
                });
            }
            else {
                navigation.navigate('SetupWorkoutDayScreen', { 
                    type: type + 1, 
                    day_number: number,
                    workout: workoutsPattern[number - 1]
                });
            }
        }
    }

    const saveWorkoutPlan = () => {
        if(!IsInputTextValid(name)) {
            AlertOK(ALERT_WARNING_TITLE, ALERT_WORKOUT_PLAN_NAME_TEXT);
            return;
        }
        if((type == 0 && workoutsWeekly.length == 0) || (type == 1 && workoutsPattern.length == 0)) {
            AlertOK(ALERT_WARNING_TITLE, ALERT_WORKOUT_PLAN_WORKOUTS_TEXT);
            return;
        }

        const tempArray = (type == 0) ? workoutsWeekly : workoutsPattern;
        SetWorkoutPlan(name, type, tempArray).then(() => {
            DeviceEventEmitter.emit("event.stateUpdate", {flag: true});
            navigation.setOptions({ tabBarVisible: true });
            navigation.navigate('TabNavigation');
        });
    }


    return(
        <SafeAreaView style={stylesMisc.container}>
            <View style={stylesMisc.back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>
            
            <View style={stylesMisc.content_start}>
                <Text style={stylesMisc.question}>Workout Plan Name</Text>

                <TextEntry
                    onChangeText={setName}
                    value={name}
                    maxLength={NAME_MAX_LENGTH}/>

                <View style={stylesMisc.middle_button_container}>
                    <GroupButton 
                        is_selected={(type == 0)? true : false}
                        title={'Weekly'}
                        pressHandler={() => setType(0)}/>

                    <GroupButton 
                        is_selected={(type == 1)? true : false}
                        title={'Pattern'}
                        pressHandler={() => setType(1)}/>
                </View>

                <Text style={stylesMisc.subtitle}>Days</Text>

                {(type == 0) ? 
                    <ScrollView style={stylesMisc.scrollContent} showsVerticalScrollIndicator={false}>
                        <SetupWorkoutBox 
                            day='Monday'
                            workoutName={workoutsWeekly[0].name}
                            pressHandler={() => openWorkoutDaysScreen(1)}/>

                            
                        <SetupWorkoutBox 
                            style={stylesWorkoutSetup.box_margin}
                            day='Tuesday'
                            workoutName={workoutsWeekly[1].name}
                            pressHandler={() => openWorkoutDaysScreen(2)}/>

                            
                        <SetupWorkoutBox 
                            style={stylesWorkoutSetup.box_margin}
                            day='Wednesday'
                            workoutName={workoutsWeekly[2].name}
                            pressHandler={() => openWorkoutDaysScreen(3)}/>

                            
                        <SetupWorkoutBox 
                            style={stylesWorkoutSetup.box_margin}
                            day='Thursday'
                            workoutName={workoutsWeekly[3].name}
                            pressHandler={() => openWorkoutDaysScreen(4)}/>

                            
                        <SetupWorkoutBox 
                            style={stylesWorkoutSetup.box_margin}
                            day='Friday'
                            workoutName={workoutsWeekly[4].name}
                            pressHandler={() => openWorkoutDaysScreen(5)}/>

                            
                        <SetupWorkoutBox 
                            style={stylesWorkoutSetup.box_margin}
                            day='Saturday'
                            workoutName={workoutsWeekly[5].name}
                            pressHandler={() => openWorkoutDaysScreen(6)}/>

                            
                        <SetupWorkoutBox 
                            style={stylesWorkoutSetup.box_margin_v}
                            day='Sunday'
                            workoutName={workoutsWeekly[6].name}
                            pressHandler={() => openWorkoutDaysScreen(7)}/>

                    </ScrollView>
                    :
                    <ScrollView style={stylesMisc.scrollContent} showsVerticalScrollIndicator={false}>
                        <View style={stylesMisc.view}>
                            {workoutsPattern ? <>{SetupWorkoutDayList(workoutsPattern, openWorkoutDaysScreen)}</> : null }

                            <SetupWorkoutAddButton pressHandler={openWorkoutDaysScreen}/>
                        </View>
                    </ScrollView>
                }
            </View>
        
            <ActionButton title={(fromEdit) ? 'Save' : 'Create'} pressHandler={saveWorkoutPlan}/>
        </SafeAreaView>
    );
};
