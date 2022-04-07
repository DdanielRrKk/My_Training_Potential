import React from 'react';
import { Text, View, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native';

import { stylesMisc } from '../../../styles/miscStyles';
import { stylesWorkoutSetup } from '../../../styles/workoutStyles';

import BackButton from '../../../components/misc/backButton';
import CheckButton from '../../../components/misc/checkButton';
import GroupButton from '../../../components/misc/groupButton';
import NumberInput from '../../../components/misc/numberInput';
import TextEntry from '../../../components/misc/textEntry';

import { GetCorrectTextInput } from '../../../helpers/helpers';
import { NAME_MAX_LENGTH, LONG_TEXT_MAX_LENGTH, WORKOUT_NUMBER_MAX_LENGTH, WORKOUT_TIME_MAX_LENGTH } from '../../../helpers/constants';



export default function SetupWorkoutExerciseScreen({ navigation, route }){
    const [isFromEdit, setIsFromEdit] = React.useState(false);
    const [key, setKey] = React.useState(null);

    const [name, setName] = React.useState('');
    const [sets, setSets] = React.useState(null);
    const [rest, setRest] = React.useState(null);
    const [type, setType] = React.useState(0);

    const [minReps, setMinReps] = React.useState(null);
    const [maxReps, setMaxReps] = React.useState(null);
    
    const [duration, setDuration] = React.useState(null);

    const [instructions, setInstructions] = React.useState('');

    React.useEffect(() => {
        if(route.params?.isFromEdit) setIsFromEdit(route.params?.isFromEdit);
        if(route.params?.exercise) {
            setKey(route.params.exercise.key);
            setName(route.params.exercise.name);
            setInstructions(route.params.exercise.instructions);
            setSets(route.params.exercise.sets);
            setRest(route.params.exercise.rest);
            setType(route.params.exercise.type);
            setMinReps(route.params.exercise.minReps);
            setMaxReps(route.params.exercise.maxReps);
            setDuration(route.params.exercise.duration);
        }
    }, [route.params?.exercise, route.params?.isFromEdit]);


    const openPrevScreen = () => navigation.goBack();

    const addWorkout= () => navigation.navigate('SetupWorkoutDayScreen', (type == 0) ? {
        exercise: {
            key: null,
            name: name,
            description: `${(sets)?sets:'0'} sets X ${(minReps)?minReps:'0'} - ${(maxReps)?maxReps:'0'} reps / ${(rest)?rest:'0'}s rest`,
            instructions: instructions,
            sets: sets,
            type: type,
            minReps: minReps,
            maxReps: maxReps,
            rest: rest
        }
    } : {
        exercise: {
            key: null,
            name: name,
            description: `${(sets)?sets:'0'} sets X ${(duration)?duration:'0'}s / ${(rest)?rest:'0'}s rest`,
            instructions: instructions,
            sets: sets,
            type: type,
            duration: duration,
            rest: rest
        }
    });

    const editWorkout= () => navigation.navigate('SetupWorkoutDayScreen', (type == 0) ? {
        exercise: {
            key: key,
            name: name,
            description: `${(sets)?sets:'0'} sets X ${(minReps)?minReps:'0'} - ${(maxReps)?maxReps:'0'} reps / ${(rest)?rest:'0'}s rest`,
            instructions: instructions,
            sets: sets,
            type: type,
            minReps: minReps,
            maxReps: maxReps,
            rest: rest
        }
    } : {
        exercise: {
            key: key,
            name: name,
            description: `${(sets)?sets:'0'} sets X ${(duration)?duration:'0'}s / ${(rest)?rest:'0'}s rest`,
            instructions: instructions,
            sets: sets,
            type: type,
            duration: duration,
            rest: rest
        }
    });

    // Sets
    const changeSetsHandler = (value) => setSets(value);
    const incSetsHandler = () => setSets(`${GetCorrectTextInput(sets, true)}`);
    const decSetsHandler = () => setSets(`${GetCorrectTextInput(sets, false)}`);
    
    // MinReps
    const changeMinRepsHandler = (value) => setMinReps(value);
    const incMinRepsHandler = () => setMinReps(`${GetCorrectTextInput(minReps, true)}`);
    const decMinRepsHandler = () => setMinReps(`${GetCorrectTextInput(minReps, false)}`);
    
    // MaxReps
    const changeMaxRepsHandler = (value) => setMaxReps(value);
    const incMaxRepsHandler = () => setMaxReps(`${GetCorrectTextInput(maxReps, true)}`);
    const decMaxRepsHandler = () => setMaxReps(`${GetCorrectTextInput(maxReps, false)}`);
    
    // Duration
    const changeDurationHandler = (value) => setDuration(value);
    const incDurationHandler = () => setDuration(`${GetCorrectTextInput(duration, true)}`);
    const decDurationHandler = () => setDuration(`${GetCorrectTextInput(duration, false)}`);
    
    // Rest
    const changeRestHandler = (value) => setRest(value);
    const incRestHandler = () => setRest(`${GetCorrectTextInput(rest, true)}`);
    const decRestHandler = () => setRest(`${GetCorrectTextInput(rest, false)}`);

    return(
        <SafeAreaView style={stylesWorkoutSetup.container}>
            <KeyboardAvoidingView style={stylesMisc.content}>
                <View style={stylesWorkoutSetup.back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>

                    <CheckButton pressHandler={(isFromEdit) ? editWorkout : addWorkout }/>
                </View>

                <View style={stylesMisc.content_start}>
                    <Text style={stylesMisc.question}>Exercise Name</Text>

                    <TextEntry
                        onChangeText={setName}
                        value={name}
                        maxLength={NAME_MAX_LENGTH}/>

                    <View style={stylesWorkoutSetup.middle_button_container}>
                        <GroupButton 
                            is_selected={(type == 0)? true : false}
                            title={'Dynamic'}
                            pressHandler={() => setType(0)}/>

                        <GroupButton 
                            is_selected={(type == 1)? true : false}
                            title={'Static'}
                            pressHandler={() => setType(1)}/>
                    </View>

                    <View style={stylesWorkoutSetup.box}>
                        <View style={stylesWorkoutSetup.subBox}>
                            <Text style={stylesWorkoutSetup.text}>Sets</Text>

                            <NumberInput
                                value={sets}
                                onChangeHandler={changeSetsHandler}
                                incValueHandler={incSetsHandler}
                                decValueHandler={decSetsHandler}
                                maxLength={WORKOUT_NUMBER_MAX_LENGTH}/>
                        </View>

                        {(type == 0) ? 
                        <>
                            <View style={stylesWorkoutSetup.subBox_middle}>
                                <Text style={stylesWorkoutSetup.text}>Min Reps</Text>

                                <NumberInput
                                    value={minReps}
                                    onChangeHandler={changeMinRepsHandler}
                                    incValueHandler={incMinRepsHandler}
                                    decValueHandler={decMinRepsHandler}
                                    maxLength={WORKOUT_NUMBER_MAX_LENGTH}/>
                            </View>

                            <View style={stylesWorkoutSetup.subBox_middle}>
                                <Text style={stylesWorkoutSetup.text}>Max Reps</Text>

                                <NumberInput
                                    value={maxReps}
                                    onChangeHandler={changeMaxRepsHandler}
                                    incValueHandler={incMaxRepsHandler}
                                    decValueHandler={decMaxRepsHandler}
                                    maxLength={WORKOUT_NUMBER_MAX_LENGTH}/>
                            </View>
                        </>
                        : 
                            <View style={stylesWorkoutSetup.subBox_middle}>
                                <Text style={stylesWorkoutSetup.text}>Duration (sec)</Text>

                                <NumberInput
                                    value={duration}
                                    onChangeHandler={changeDurationHandler}
                                    incValueHandler={incDurationHandler}
                                    decValueHandler={decDurationHandler}
                                    maxLength={WORKOUT_TIME_MAX_LENGTH}/>
                            </View>
                        }

                        <View style={stylesWorkoutSetup.subBox_middle}>
                            <Text style={stylesWorkoutSetup.text}>Rest (sec)</Text>

                            <NumberInput
                                value={rest}
                                onChangeHandler={changeRestHandler}
                                incValueHandler={incRestHandler}
                                decValueHandler={decRestHandler}
                                maxLength={WORKOUT_TIME_MAX_LENGTH}/>
                        </View>
                    </View>

                    <View style={stylesWorkoutSetup.boxInstruction}>
                        <Text style={stylesWorkoutSetup.instructionsText}>Instructions</Text>

                        <TextInput
                            style={stylesWorkoutSetup.instructions}
                            placeholder='(optional)'
                            onChangeText={setInstructions}
                            value={instructions}
                            maxLength={LONG_TEXT_MAX_LENGTH}
                            multiline={true}
                            numberOfLines={4}/>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
