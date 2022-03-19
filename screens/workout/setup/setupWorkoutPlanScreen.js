import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';

import { container, content, back_button_container } from '../../../styles/miscStyles';

import BackButton from '../../../components/misc/backButton';
import SetupWorkoutBox from '../../../components/workout/setup/setupWorkoutBox';



const NAME_MAX_LENGTH = 40;

export default function SetupWorkoutPlanScreen({ navigation, route }){
    const [name, setName] = React.useState(null);

    const [monday, setMonday] = React.useState({
        name: null,
        exercises: []
    });
    const [tuesday, setTuesday] = React.useState({
        name: null,
        exercises: []
    });
    const [wednesday, setWednesday] = React.useState({
        name: null,
        exercises: []
    });
    const [thursday, setThursday] = React.useState({
        name: null,
        exercises: []
    });
    const [friday, setFriday] = React.useState({
        name: null,
        exercises: []
    });
    const [saturday, setSaturday] = React.useState({
        name: null,
        exercises: []
    });
    const [sunday, setSunday] = React.useState({
        name: null,
        exercises: []
    });

    React.useEffect(() => {
        if(route.params?.day_number) {
            console.log('route.params?.day_number', route.params?.day_number);
            console.log('route.params?.day', route.params?.day);
            if(route.params?.day_number == 1) setMonday(route.params?.day);
            if(route.params?.day_number == 2) setTuesday(route.params?.day);
            if(route.params?.day_number == 3) setWednesday(route.params?.day);
            if(route.params?.day_number == 4) setThursday(route.params?.day);
            if(route.params?.day_number == 5) setFriday(route.params?.day);
            if(route.params?.day_number == 6) setSaturday(route.params?.day);
            if(route.params?.day_number == 7) setSunday(route.params?.day);
        }
    }, [route.params?.day_number, route.params?.day]);


    React.useEffect(() => {
        let isGood = true;

        // SetAndGetMealResults().then(({calories, carbs, protein, fat}) => { 
        //     if(isGood) {
        //         setCalories(calories);
        //         setCarbs(carbs);
        //         setProtein(protein);
        //         setFat(fat);
        //     }
        // });

        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, []);

    const openPrevScreen = () => navigation.goBack();

    // const openNextScreen = () => {
    //     route.params?.setMealReady();
    //     navigation.setOptions({ tabBarVisible: true });
    //     navigation.navigate('TabNavigation');
    // }

    const openWorkoutDaysScreen = (number) => navigation.navigate('SetupWorkoutDayScreen', {day_number: number});
    const tempAdd = () => console.log('add');

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

            </View>
        
            <TouchableOpacity
                style={styles.add}
                onPress={tempAdd}>
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
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
        alignItems: 'center',
        width: '100%'
    },
});