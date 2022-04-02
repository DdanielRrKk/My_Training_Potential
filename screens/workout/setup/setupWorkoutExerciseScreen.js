import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, KeyboardAvoidingView } from 'react-native';

import { container, content, back_button_container, question } from '../../../styles/miscStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../styles/colors';

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
        <SafeAreaView style={[container, { paddingBottom: 0 }]}>
            <KeyboardAvoidingView style={[content, {width: '100%'}]}>
                <View style={[back_button_container, {justifyContent: 'space-between'}]}>
                    <BackButton pressHandler={openPrevScreen}/>

                    <CheckButton pressHandler={(isFromEdit) ? editWorkout : addWorkout }/>
                </View>

                <View style={[content, {width: '100%', justifyContent: 'flex-start'}]}>
                    <Text style={question}>Exercise Name</Text>

                    <TextEntry
                        onChangeText={setName}
                        value={name}
                        maxLength={NAME_MAX_LENGTH}/>

                    <View style={styles.middle_button_container}>
                        <GroupButton 
                            is_selected={(type == 0)? true : false}
                            title={'Dynamic'}
                            pressHandler={() => setType(0)}/>

                        <GroupButton 
                            is_selected={(type == 1)? true : false}
                            title={'Static'}
                            pressHandler={() => setType(1)}/>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.subBox}>
                            <Text style={styles.text}>Sets</Text>

                            <NumberInput
                                value={sets}
                                onChangeHandler={changeSetsHandler}
                                incValueHandler={incSetsHandler}
                                decValueHandler={decSetsHandler}
                                maxLength={WORKOUT_NUMBER_MAX_LENGTH}/>
                        </View>

                        {(type == 0) ? 
                        <>
                            <View style={[styles.subBox, {marginTop: 16}]}>
                                <Text style={styles.text}>Min Reps</Text>

                                <NumberInput
                                    value={minReps}
                                    onChangeHandler={changeMinRepsHandler}
                                    incValueHandler={incMinRepsHandler}
                                    decValueHandler={decMinRepsHandler}
                                    maxLength={WORKOUT_NUMBER_MAX_LENGTH}/>
                            </View>

                            <View style={[styles.subBox, {marginTop: 16}]}>
                                <Text style={styles.text}>Max Reps</Text>

                                <NumberInput
                                    value={maxReps}
                                    onChangeHandler={changeMaxRepsHandler}
                                    incValueHandler={incMaxRepsHandler}
                                    decValueHandler={decMaxRepsHandler}
                                    maxLength={WORKOUT_NUMBER_MAX_LENGTH}/>
                            </View>
                        </>
                        : 
                            <View style={[styles.subBox, {marginTop: 16}]}>
                                <Text style={styles.text}>Duration (sec)</Text>

                                <NumberInput
                                    value={duration}
                                    onChangeHandler={changeDurationHandler}
                                    incValueHandler={incDurationHandler}
                                    decValueHandler={decDurationHandler}
                                    maxLength={WORKOUT_TIME_MAX_LENGTH}/>
                            </View>
                        }

                        <View style={[styles.subBox, {marginTop: 16}]}>
                            <Text style={styles.text}>Rest (sec)</Text>

                            <NumberInput
                                value={rest}
                                onChangeHandler={changeRestHandler}
                                incValueHandler={incRestHandler}
                                decValueHandler={decRestHandler}
                                maxLength={WORKOUT_TIME_MAX_LENGTH}/>
                        </View>
                    </View>

                    <View style={styles.boxInstruction}>
                        <Text style={styles.instructionsText}>Instructions</Text>

                        <TextInput
                            style={styles.instructions}
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



const styles = StyleSheet.create({
    middle_button_container: {
        width: '100%',
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }, 

    box: {
        width: '100%',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR,
        marginTop: 16,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    subBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },

    boxInstruction: {
        width: '100%',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
        marginTop: 16,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    instructionsText: {
        fontSize: 16,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        color: SECONDARY_COLOR,
        marginBottom: 16
    },

    instructions: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: SECONDARY_COLOR,
        color: TERTIARY_COLOR
    },
});