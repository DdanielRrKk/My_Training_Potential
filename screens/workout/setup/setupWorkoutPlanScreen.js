import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

import { container, content, back_button_container } from '../../../styles/miscStyles';

import BackButton from '../../../components/misc/backButton';
import SetupWorkoutBox from '../../../components/workout/setup/setupWorkoutBox';

import { SetWorkoutPlan } from '../../../database/screen/workout/workout_setup_services';
import { GetEditWorkoutDataScreenData } from '../../../database/screen/home/settings_services';

import { useSystemFlagsGlobal } from '../../../helpers/globalState';



const NAME_MAX_LENGTH = 40;

export default function SetupWorkoutPlanScreen({ navigation, route }){
    const [systemFlags, setSystemFlags] = useSystemFlagsGlobal();
    
    const [name, setName] = React.useState('');

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
    }, [route.params?.day]);

    React.useEffect(() => {
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

            return () => {  isGood = false; } // to prevent memory leaks (clean up)
        }
    }, [route.params?.isFromEdit]);

    const openPrevScreen = () => navigation.goBack();

    const openWorkoutDaysScreen = (number) => {
        if(number == 1) navigation.navigate('SetupWorkoutDayScreen', monday);
        if(number == 2) navigation.navigate('SetupWorkoutDayScreen', tuesday);
        if(number == 3) navigation.navigate('SetupWorkoutDayScreen', wednesday);
        if(number == 4) navigation.navigate('SetupWorkoutDayScreen', thursday);
        if(number == 5) navigation.navigate('SetupWorkoutDayScreen', friday);
        if(number == 6) navigation.navigate('SetupWorkoutDayScreen', saturday);
        if(number == 7) navigation.navigate('SetupWorkoutDayScreen', sunday);
    }
    const createWorkoutPlan = () => {
        SetWorkoutPlan(name, monday, tuesday, wednesday, thursday, friday, saturday, sunday);
        setSystemFlags({...systemFlags, isWorkoutReady: true});
        navigation.setOptions({ tabBarVisible: true });
        navigation.navigate('TabNavigation');
    }

    return(
        <SafeAreaView style={container}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>
            
            <View style={[content, {width: '100%', justifyContent: 'flex-start'}]}>
                <Text style={styles.title}>Workout Plan Name</Text>

                <TextInput
                    style={styles.entry}
                    onChangeText={setName}
                    value={name}
                    maxLength={NAME_MAX_LENGTH}/>

                <Text style={styles.subtitle}>Days</Text>

                <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                    <SetupWorkoutBox 
                        day='Monday'
                        workoutName={monday.name}
                        pressHandler={() => openWorkoutDaysScreen(1)}/>

                        
                    <SetupWorkoutBox 
                        style={{marginTop: 16}}
                        day='Tuesday'
                        workoutName={tuesday.name}
                        pressHandler={() => openWorkoutDaysScreen(2)}/>

                        
                    <SetupWorkoutBox 
                        style={{marginTop: 16}}
                        day='Wednesday'
                        workoutName={wednesday.name}
                        pressHandler={() => openWorkoutDaysScreen(3)}/>

                        
                    <SetupWorkoutBox 
                        style={{marginTop: 16}}
                        day='Thursday'
                        workoutName={thursday.name}
                        pressHandler={() => openWorkoutDaysScreen(4)}/>

                        
                    <SetupWorkoutBox 
                        style={{marginTop: 16}}
                        day='Friday'
                        workoutName={friday.name}
                        pressHandler={() => openWorkoutDaysScreen(5)}/>

                        
                    <SetupWorkoutBox 
                        style={{marginTop: 16}}
                        day='Saturday'
                        workoutName={saturday.name}
                        pressHandler={() => openWorkoutDaysScreen(6)}/>

                        
                    <SetupWorkoutBox 
                        style={{marginTop: 16}}
                        day='Sunday'
                        workoutName={sunday.name}
                        pressHandler={() => openWorkoutDaysScreen(7)}/>

                </ScrollView>
            </View>
        
            <TouchableOpacity
                style={styles.add}
                onPress={createWorkoutPlan}>
                <Text>Create</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({

    title: {
        marginTop: 16,
        fontSize: 18
    },

    middle_button_container: {
        width: '100%',
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    entry:{
        width: '100%',
        marginTop: 16,
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        justifyContent: 'center',
    },

    subtitle: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        fontSize: 18,
        paddingVertical: 16
    },

    add: {
        marginTop: 16,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
        alignItems: 'center',
        width: '100%'
    },
});