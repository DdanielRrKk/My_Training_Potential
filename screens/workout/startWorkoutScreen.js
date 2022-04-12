import React from 'react';
import { Text, TouchableOpacity, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesWorkout } from '../../styles/workoutStyles';

import BackButton from '../../components/misc/backButton';
import NumberInput from '../../components/misc/numberInput';
import ActionButton from '../../components/misc/actionButton';

import { calculateTimeString } from '../../helpers/timer';
import { GetCorrectTextInput, getAverage } from '../../helpers/helpers';



export default function StartWorkoutScreen({ navigation, route }){
    const [dayName, setDayName] = React.useState(null);
    const [exercises, setExercises] = React.useState(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const [currentSet, setCurrentSet] = React.useState(1);
    
    const [name, setName] = React.useState(null);
    const [instructions, setInstructions] = React.useState(null);

    const [type, setType] = React.useState(0);
    const [sets, setSets] = React.useState(0);
    const [rest, setRest] = React.useState(0);

    const [duration, setDuration] = React.useState(0);
    const [durationString, setDurationString] = React.useState(null);
    
    const [minReps, setMinReps] = React.useState(0);
    const [maxReps, setMaxReps] = React.useState(0);
    const [reps, setReps] = React.useState('0');
    
    const [totalTime, setTotalTime] = React.useState(0);
    const [totalTimeString, setTotalTimeString] = React.useState(null);

    const [totalReps, setTotalReps] = React.useState(0);
    const [finishedExercises, setFinishedExercises] = React.useState([]);

    const [next, setNext] = React.useState(0);

    React.useEffect(() => {
        console.log('route.params.exercises ', route.params.exercises);
        if(route.params?.exercises) {
            setExercises(route.params.exercises);

            setName(route.params.exercises[currentIndex].name);
            setInstructions(route.params.exercises[currentIndex].instructions);
            setType(route.params.exercises[currentIndex].type);
            setSets(route.params.exercises[currentIndex].sets);
            setMinReps(route.params.exercises[currentIndex].minReps);
            setMaxReps(route.params.exercises[currentIndex].maxReps);
            setReps(getAverage(route.params.exercises[currentIndex].minReps, route.params.exercises[currentIndex].maxReps));
            setRest(route.params.exercises[currentIndex].rest);
            setDuration(route.params.exercises[currentIndex].duration);
        
            setDurationString(calculateTimeString(route.params.exercises[currentIndex].duration));
        }
        if(route.params?.day_name) setDayName(route.params?.day_name);
    }, [route.params?.exercises, route.params?.day_name]);

    // next set / exercise
    React.useEffect(() => {
        if(route.params?.next) {
            console.log('route.params?.next', route.params?.next);
            setNext(route.params?.next);

            if(currentSet < sets) {
                console.log('next set');
                setTotalReps(totalReps + parseInt(reps));
                setCurrentSet(currentSet + 1);
                return;
            }

            const lastKey = (finishedExercises.length == 0) ? 1 : finishedExercises[finishedExercises.length - 1].key + 1;

            if(currentIndex == exercises.length - 1) {
                console.log('exercises ended');
                navigation.navigate('FinalWorkoutScreen', {
                    day_name: dayName,
                    total_time: totalTimeString, 
                    finished_exercises: [...finishedExercises, {
                        key: lastKey,
                        name: name,
                        sets: sets,
                        type: type,
                        totals: (type == 0) ? (totalReps + parseInt(reps)) : (sets * duration)
                    }]
                });
                return;
            }

            console.log('next exercise');
            setFinishedExercises([...finishedExercises, {
                key: lastKey,
                name: name,
                sets: sets,
                type: type,
                totals: (type == 0) ? (totalReps + parseInt(reps)) : (sets * duration)
            }]);
            setCurrentIndex(currentIndex + 1);
            setCurrentSet(1);
            return;
        }
    }, [route.params?.next]);

    // timer 
    React.useEffect(() => {
        const good = setTimeout(() => {
            setTotalTimeString(calculateTimeString(totalTime));
            setTotalTime(totalTime + 1);
        }, 1000);
        return () => clearTimeout(good);
    });

    // next exercise
    React.useEffect(() => {
        let isGood = true;

        if(isGood && exercises != null && exercises != undefined) {
            console.log('exercises inside if ', exercises);
            setName(exercises[currentIndex].name);
            setInstructions(exercises[currentIndex].instructions);
            setType(exercises[currentIndex].type);
            setSets(exercises[currentIndex].sets);
            setMinReps(exercises[currentIndex].minReps);
            setMaxReps(exercises[currentIndex].maxReps);
            setReps(getAverage(exercises[currentIndex].minReps, exercises[currentIndex].maxReps));
            setRest(exercises[currentIndex].rest);
            setDuration(exercises[currentIndex].duration);
            setDurationString(calculateTimeString(exercises[currentIndex].duration));
        }

        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, [
        currentIndex,
        name,
        type,
        sets,
        minReps,
        maxReps,
        rest,
        duration
    ]);

    const openPrevScreen = () => navigation.goBack();

    const doneSet = () => navigation.navigate('TimeWorkoutScreen', {time: rest, next: next, isDuration: false});

    const changeRepsHandler = (value) => setReps(value);
    const incRepsHandler = () => setReps(`${GetCorrectTextInput(reps, true)}`);
    const decRepsHandler = () => setReps(`${GetCorrectTextInput(reps, false)}`);

    const startDuration = () => navigation.navigate('TimeWorkoutScreen', {time: duration, next: next, isDuration: true});

    return(
        <SafeAreaView style={stylesMisc.container}>
            <KeyboardAvoidingView style={stylesMisc.keyboardContainer}>
                <View style={stylesWorkout.back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>

                    <Text style={stylesWorkout.label_18}>{totalTimeString}</Text>
                </View>

                <View style={stylesMisc.content}>
                    <Text style={stylesWorkout.name}>{name}</Text>

                    <Text style={stylesWorkout.sets}>Set {currentSet} / {sets}</Text>

                    {(instructions != '') ? 
                     <View style={stylesWorkout.instructionBox}>
                        <Text style={stylesWorkout.instructionText}>Instruction: </Text>
                        <Text style={stylesWorkout.instructionText}>{instructions}</Text>
                    </View>
                    : null }

                    {(type == 0) ?
                        <NumberInput
                            style={stylesWorkout.input}
                            value={`${reps}`}
                            onChangeHandler={changeRepsHandler}
                            incValueHandler={incRepsHandler}
                            decValueHandler={decRepsHandler}/>
                    :
                        <View style={stylesWorkout.view}>
                            <Text style={stylesWorkout.duration_text}>{durationString}</Text>
                            
                            <TouchableOpacity 
                                style={stylesWorkout.btn}
                                onPress={startDuration}>
                                <Text style={stylesWorkout.text_btn}>Start</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            
                <ActionButton title='Next' pressHandler={doneSet}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
