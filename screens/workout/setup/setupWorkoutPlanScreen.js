import React from 'react';
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, DeviceEventEmitter } from 'react-native';

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

import { IsInputTextValid } from '../../../helpers/validations';
import { AlertOK } from '../../../helpers/alerts';
import { 
    NAME_MAX_LENGTH,
    ALERT_WARNING_TITLE,
    ALERT_WORKOUT_PLAN_NAME_TEXT
} from '../../../helpers/constants';

import { AntDesign } from '@expo/vector-icons';



export default function SetupWorkoutPlanScreen({ navigation, route }){
    const [fromEdit, setFromEdit] = React.useState(false);
    
    const [name, setName] = React.useState('');
    const [type, setType] = React.useState(0);

    const [monday, setMonday] = React.useState({
        day_number: 1,
        name: null,
        exercises: []
    });
    const [tuesday, setTuesday] = React.useState({
        day_number: 2,
        name: null,
        exercises: []
    });
    const [wednesday, setWednesday] = React.useState({
        day_number: 3,
        name: null,
        exercises: []
    });
    const [thursday, setThursday] = React.useState({
        day_number: 4,
        name: null,
        exercises: []
    });
    const [friday, setFriday] = React.useState({
        day_number: 5,
        name: null,
        exercises: []
    });
    const [saturday, setSaturday] = React.useState({
        day_number: 6,
        name: null,
        exercises: []
    });
    const [sunday, setSunday] = React.useState({
        day_number: 7,
        name: null,
        exercises: []
    });


    const [workouts, setWorkouts] = React.useState([]);
    // napravi taka che da moje da se zapazvat dva tipa trenirovychni planove

    React.useEffect(() => {
        if(route.params?.day) {
            if(route.params?.day.day_number == 1) setMonday(route.params?.day);
            if(route.params?.day.day_number == 2) setTuesday(route.params?.day);
            if(route.params?.day.day_number == 3) setWednesday(route.params?.day);
            if(route.params?.day.day_number == 4) setThursday(route.params?.day);
            if(route.params?.day.day_number == 5) setFriday(route.params?.day);
            if(route.params?.day.day_number == 6) setSaturday(route.params?.day);
            if(route.params?.day.day_number == 7) setSunday(route.params?.day);
        }

        if(route.params?.isFromEdit) {
            let isGood = true;

            GetEditWorkoutDataScreenData().then(({
                name, 
                monday,
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
                sunday
            }) => { 
                if(isGood) {
                    setName(name);
                    setMonday(monday);
                    setTuesday(tuesday);
                    setWednesday(wednesday);
                    setThursday(thursday);
                    setFriday(friday);
                    setSaturday(saturday);
                    setSunday(sunday);
                }
            });

            setFromEdit(true);

            return () => {  isGood = false; } // to prevent memory leaks (clean up)
        }
        return () => {
            DeviceEventEmitter.removeListener('event.stateUpdate');
        }
    }, [route.params?.day, route.params?.isFromEdit]);


    const openPrevScreen = () => navigation.goBack();

    const createWorkoutDay = () => {

    };

    const openWorkoutDaysScreen = (number) => {
        if(type == 0) {
            if(number == 1) navigation.navigate('SetupWorkoutDayScreen', monday);
            if(number == 2) navigation.navigate('SetupWorkoutDayScreen', tuesday);
            if(number == 3) navigation.navigate('SetupWorkoutDayScreen', wednesday);
            if(number == 4) navigation.navigate('SetupWorkoutDayScreen', thursday);
            if(number == 5) navigation.navigate('SetupWorkoutDayScreen', friday);
            if(number == 6) navigation.navigate('SetupWorkoutDayScreen', saturday);
            if(number == 7) navigation.navigate('SetupWorkoutDayScreen', sunday);
        }
        else {
            navigation.navigate('SetupWorkoutDayScreen', workouts[number - 1]);
        }
    }
    const createWorkoutPlan = () => {
        if(!IsInputTextValid(name)) {
            AlertOK(ALERT_WARNING_TITLE, ALERT_WORKOUT_PLAN_NAME_TEXT, null);
            return;
        }
        
        SetWorkoutPlan(name, monday, tuesday, wednesday, thursday, friday, saturday, sunday).then(() => {
            DeviceEventEmitter.emit("event.stateUpdate", {flag: true});
            navigation.setOptions({ tabBarVisible: true });
            navigation.navigate('TabNavigation');
        });
    }
    const saveWorkoutPlan = () => {
        if(!IsInputTextValid(name)) {
            AlertOK(ALERT_WARNING_TITLE, ALERT_WORKOUT_PLAN_NAME_TEXT, null);
            return;
        }

        SetWorkoutPlan(name, monday, tuesday, wednesday, thursday, friday, saturday, sunday).then(() => {
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
                            workoutName={monday.name}
                            pressHandler={() => openWorkoutDaysScreen(1)}/>

                            
                        <SetupWorkoutBox 
                            style={stylesWorkoutSetup.box_margin}
                            day='Tuesday'
                            workoutName={tuesday.name}
                            pressHandler={() => openWorkoutDaysScreen(2)}/>

                            
                        <SetupWorkoutBox 
                            style={stylesWorkoutSetup.box_margin}
                            day='Wednesday'
                            workoutName={wednesday.name}
                            pressHandler={() => openWorkoutDaysScreen(3)}/>

                            
                        <SetupWorkoutBox 
                            style={stylesWorkoutSetup.box_margin}
                            day='Thursday'
                            workoutName={thursday.name}
                            pressHandler={() => openWorkoutDaysScreen(4)}/>

                            
                        <SetupWorkoutBox 
                            style={stylesWorkoutSetup.box_margin}
                            day='Friday'
                            workoutName={friday.name}
                            pressHandler={() => openWorkoutDaysScreen(5)}/>

                            
                        <SetupWorkoutBox 
                            style={stylesWorkoutSetup.box_margin}
                            day='Saturday'
                            workoutName={saturday.name}
                            pressHandler={() => openWorkoutDaysScreen(6)}/>

                            
                        <SetupWorkoutBox 
                            style={stylesWorkoutSetup.box_margin_v}
                            day='Sunday'
                            workoutName={sunday.name}
                            pressHandler={() => openWorkoutDaysScreen(7)}/>

                    </ScrollView>
                    :
                    <ScrollView style={stylesMisc.scrollContent} showsVerticalScrollIndicator={false}>
                        {workouts ? <>{SetupWorkoutDayList(workouts, editExercise)}</> : null }

                        <TouchableOpacity style={stylesWorkoutSetup.btn} onPress={null}>
                            <AntDesign name="plus" size={24} color="black" />
                        </TouchableOpacity>
                    </ScrollView>
                }
            </View>
        
            <ActionButton title={(fromEdit) ? 'Save' : 'Create'} pressHandler={(fromEdit) ? saveWorkoutPlan : createWorkoutPlan}/>
        </SafeAreaView>
    );
};
