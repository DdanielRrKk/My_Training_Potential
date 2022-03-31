import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, SafeAreaView } from 'react-native';

import { container, back_button_container } from '../../styles/miscStyles';

import BackButton from '../../components/misc/backButton';
import WorkoutInput from '../../components/workout/setup/workoutInput';
import ActionButton from '../../components/misc/actionButton';

import { calculateTimeString } from '../../helpers/timer';
import { GetCorrectTextInput } from '../../helpers/helpers';



function getAverage(min, max) {
    const temp1 = parseInt(min);
    const temp2 = parseInt(max);
    
    return((temp1 + temp2) / 2);
}

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
        <SafeAreaView style={container}>
            <KeyboardAvoidingView style={{flex: 1, width: '100%'}}>
                <View style={[back_button_container, {justifyContent: 'space-between'}]}>
                    <BackButton pressHandler={openPrevScreen}/>

                    <Text style={{fontSize: 18, marginRight:16}}>{totalTimeString}</Text>
                </View>

                <View style={styles.content}>
                    <Text style={{fontSize: 28}}>{name}</Text>

                    <Text style={{fontSize: 20, marginTop: 16}}>Set {currentSet} / {sets}</Text>

                    {(instructions != '') ? 
                     <View style={{ backgroundColor: 'gray', borderRadius: 10, padding: 8, marginVertical: 36 }}>
                        <Text style={{color: 'white', fontSize: 16}}>Instruction: {instructions}</Text>
                    </View>
                    : null }

                    {(type == 0) ?
                        <WorkoutInput
                            style={{padding: 8, borderRadius: 10}}
                            value={`${reps}`}
                            onChangeHandler={changeRepsHandler}
                            incValueHandler={incRepsHandler}
                            decValueHandler={decRepsHandler}/>
                    :
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{fontSize: 20, marginBottom: 16}}>{durationString}</Text>
                            
                            <TouchableOpacity 
                                style={styles.btn_unactive}
                                onPress={startDuration}>
                                <Text style={{fontSize: 16}}>Start</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            
                <ActionButton title='Next' pressHandler={doneSet}/>
                {/* <TouchableOpacity
                    style={styles.next}
                    onPress={doneSet}>
                    <Text>Next</Text>
                </TouchableOpacity> */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },

    question: {
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
        marginVertical: 32,
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        justifyContent: 'center',
    },

    results: {
        width: '100%',
        backgroundColor: 'gray',
        borderRadius: 10
    },

    labels: {
        fontSize: 18
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 24
    },

    next: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
        alignItems: 'center',
    },

    btn_active: {
        fontSize: 16,
        backgroundColor: 'lightgray',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10
    },
    btn_unactive: {
        fontSize: 16,
        backgroundColor: 'gray',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10
    }
});