import React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';

import { stylesMisc } from '../../../styles/miscStyles';

import BackButton from '../../../components/misc/backButton';
import TextEntry from '../../../components/misc/textEntry';
import ActionButton from '../../../components/misc/actionButton';
import WorkoutItemList from '../../../components/workout/workoutItemList';
import SetupWorkoutAddButton from '../../../components/workout/setup/setupWorkoutAddButton';

import { IsInputTextValid } from '../../../helpers/validations';
import { AlertOK } from '../../../helpers/alerts';
import { 
    NAME_MAX_LENGTH,
    ALERT_WARNING_TITLE,
    ALERT_WORKOUT_DAY_NAME_TEXT
} from '../../../helpers/constants';



export default function SetupWorkoutDayScreen({ navigation, route }){
    const [workoutType, setWorkoutType] = React.useState(null);

    const [dayNumber, setDayNumber] = React.useState(null);
    const [name, setName] = React.useState('');
    const [exercises, setExercises] = React.useState([]);

    React.useEffect(() => {
        if(route.params?.workout) {
            setDayNumber(route.params?.workout.day_number);
            setName(route.params?.workout.name);
            setExercises(route.params?.workout.exercises);
        }
        if(route.params?.type) setWorkoutType(route.params?.type - 1);
        if(route.params?.day_number) setDayNumber(route.params?.day_number);
    }, [route.params?.workout, route.params?.type, route.params?.day_number]);

    React.useEffect(() => {
        if(route.params?.exercise) {
            if(route.params?.exercise.key !== null) {
                const tempArray = [...exercises]; // shallow copy of array
                tempArray.find((item, index) => {
                    if (item.key === route.params?.exercise.key) {
                        tempArray[index] = route.params?.exercise;
                        setExercises(tempArray);
                        return true; // stop searching
                    }
                });
                return;
            }

            const tempObject = route.params?.exercise;
            if(exercises.length == 0) {
                tempObject.key = 1;
                setExercises([tempObject]);
                return;
            }
            tempObject.key = exercises[exercises.length - 1].key + 1;
            setExercises([...exercises, tempObject]);
            return;
        }
    }, [route.params?.exercise]);
    
    // console.log('workoutType', workoutType);
    // console.log('day number', dayNumber);

    const openPrevScreen = () => navigation.goBack();

    const editExercise = (exercise) => navigation.navigate('SetupWorkoutExerciseScreen', { 
        exercise: exercise, 
        isFromEdit: true 
    });

    const addWorkout= () => navigation.navigate('SetupWorkoutExerciseScreen');

    const saveDay = () => {
        if(!IsInputTextValid(name)) {
            AlertOK(ALERT_WARNING_TITLE, ALERT_WORKOUT_DAY_NAME_TEXT, null);
            return;
        }

        navigation.navigate('SetupWorkoutPlanScreen', {
            type: workoutType + 1,
            workout: {
                day_number: dayNumber,
                name: name,
                exercises: exercises
            }
        });
    }
    

    return(
        <SafeAreaView style={stylesMisc.container}>
            <View style={stylesMisc.back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={stylesMisc.content}>
                <Text style={stylesMisc.question}>Workout Name</Text>

                <TextEntry
                    onChangeText={setName}
                    value={name}
                    maxLength={NAME_MAX_LENGTH}/>

                <Text style={stylesMisc.subtitle}>Exercises</Text>

                <ScrollView style={stylesMisc.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={stylesMisc.view}>
                        {exercises ? <>{WorkoutItemList(exercises, editExercise)}</> : null }

                        <SetupWorkoutAddButton pressHandler={addWorkout}/>
                    </View>
                </ScrollView>

            </View>
        
            <ActionButton title='Save' pressHandler={saveDay}/>
        </SafeAreaView>
    );
};
