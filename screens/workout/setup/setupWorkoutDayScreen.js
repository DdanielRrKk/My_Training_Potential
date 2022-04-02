import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';

import { container, content, back_button_container, question, subtitle } from '../../../styles/miscStyles';
import { TERTIARY_COLOR } from '../../../styles/colors';

import BackButton from '../../../components/misc/backButton';
import TextEntry from '../../../components/misc/textEntry';
import ActionButton from '../../../components/misc/actionButton';
import WorkoutItemList from '../../../components/workout/workoutItemList';

import { NAME_MAX_LENGTH } from '../../../helpers/constants';

import { EvilIcons } from '@expo/vector-icons';



export default function SetupWorkoutDayScreen({ navigation, route }){
    const [dayNumber, setDayNumber] = React.useState(null);

    const [name, setName] = React.useState('');
    const [exercises, setExercises] = React.useState([]);

    React.useEffect(() => {
        if(route.params?.day_number) setDayNumber(route.params.day_number);
        if(route.params?.name) setName(route.params.name);
        if(route.params?.exercises) setExercises(route.params.exercises);
    }, [route.params?.day_number, route.params?.name, route.params?.exercises]);

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
    
    // console.log('exercises', exercises);
    // console.log('day number', dayNumber);

    const openPrevScreen = () => navigation.goBack();

    const editExercise = (exercise) => navigation.navigate('SetupWorkoutExerciseScreen', { 
        exercise: exercise, 
        isFromEdit: true 
    });

    const addWorkout= () => navigation.navigate('SetupWorkoutExerciseScreen');

    const createDay = () => navigation.navigate('SetupWorkoutPlanScreen', {
        day: {
            day_number: dayNumber,
            name: name,
            exercises: exercises
        }
    });

    return(
        <SafeAreaView style={container}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={[content, {width: '100%'}]}>
                <Text style={question}>Workout Name</Text>

                <TextEntry
                    onChangeText={setName}
                    value={name}
                    maxLength={NAME_MAX_LENGTH}/>

                <Text style={subtitle}>Exercises</Text>

                <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        {exercises ? <>{WorkoutItemList(exercises, editExercise)}</> : null }

                        <TouchableOpacity onPress={addWorkout}>
                            <EvilIcons name="plus" size={42} color={TERTIARY_COLOR} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </View>
        
            <ActionButton title='Save' pressHandler={createDay}/>
        </SafeAreaView>
    );
};
