import React from 'react';
import { Text, View, SafeAreaView, FlatList } from 'react-native';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesWorkout } from '../../styles/workoutStyles';

import BackButton from '../../components/misc/backButton';
import Header from '../../components/misc/header';
import ActionButton from '../../components/misc/actionButton';
import { ExerciseItem } from '../../components/workout/exerciseItem';

import { AlertOK } from '../../helpers/alerts';
import { calculateTimeString } from '../../helpers/timer';
import { GetCorrectTextInput, GetReadyArrayForExercises } from '../../helpers/helpers';



export default function StartWorkoutScreen({ navigation, route }){
    const [dayName, setDayName] = React.useState(null);
    const [exercises, setExercises] = React.useState(null);

    const [totalTime, setTotalTime] = React.useState(0);
    const [totalTimeString, setTotalTimeString] = React.useState(null);

    React.useEffect(() => {
        console.log('route.params.exercises ', route.params.exercises);
        if(route.params?.exercises) {
            const tempArray = GetReadyArrayForExercises(route.params?.exercises);
            setExercises(tempArray);
        }
        if(route.params?.day_name) setDayName(route.params?.day_name);
    }, [route.params?.exercises, route.params?.day_name]);


    // timer 
    React.useEffect(() => {
        const good = setTimeout(() => {
            setTotalTimeString(calculateTimeString(totalTime));
            setTotalTime(totalTime + 1);
        }, 1000);
        return () => clearTimeout(good);
    });


    const openPrevScreen = () => navigation.goBack();


    const incValueHandler = (key) => {
        if(exercises[key - 1].value < 9999) {
            exercises[key - 1].value = GetCorrectTextInput(exercises[key - 1].value, true);
            setExercises([... exercises]);
        }
    }
    const decValueHandler = (key) => {
        if(exercises[key - 1].value > 0) {
            exercises[key - 1].value = GetCorrectTextInput(exercises[key - 1].value, false);
            setExercises([... exercises]);
        }
    }

    const finishValueHandler = (key) => {
        if(exercises[key - 1].isFinished) {
            exercises[key - 1].isFinished = false;
            setExercises([... exercises]);
        }
        else {
            exercises[key - 1].isFinished = true;
            setExercises([... exercises]);
            navigation.navigate('TimeWorkoutScreen', {
                rest: exercises[key - 1].rest,
                duration: null,
                isDuration: false
            });
        }
    }

    const startDurationHandler = (key) => {
        navigation.navigate('TimeWorkoutScreen', {
            rest: exercises[key - 1].rest, 
            duration: exercises[key - 1].value,
            isDuration: true
        });
        exercises[key - 1].isFinished = true;
        setExercises([... exercises]);
    }

    const finishWorkout = () => {
        const finishedExercises = [];

        for (let i = 0; i < exercises.length; i++) {
            if(!exercises[i].isFinished && exercises[i].type != -1) {
                AlertOK('Warning !', 'You must check all of your exercises to finish the workout!', null);
                return;
            }
            
            finishedExercises.push({
                key: i + 1,
                name: exercises[i].name,
                type: exercises[i].type,
                value: exercises[i].value
            });
        }

        console.log('finishedExercises', finishedExercises);
        navigation.navigate('FinalWorkoutScreen', {
            day_name: dayName,
            total_time: totalTimeString, 
            finished_exercises: finishedExercises
        });
    }

    return (
        <SafeAreaView style={stylesMisc.container}>
            <View style={stylesWorkout.back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>

                <Text style={stylesWorkout.label_18}>{totalTimeString}</Text>
            </View>

            <View style={stylesWorkout.headerStartExercise}>
                <Text style={stylesWorkout.headerTextStartExercise}>{dayName}</Text>
            </View>

            <FlatList
                style={stylesMisc.scrollContent}
                data={exercises}
                renderItem={({item}) => (
                    <ExerciseItem
                        item={item}
                        finishValueHandler={finishValueHandler}
                        incValueHandler={incValueHandler}
                        decValueHandler={decValueHandler}
                        startDurationHandler={startDurationHandler}/>
                )}/>

            <ActionButton title='Finish' pressHandler={finishWorkout}/>    
        </SafeAreaView>
    );
};
