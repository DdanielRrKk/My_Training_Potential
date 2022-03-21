import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Switch } from 'react-native';

import { container, content, back_button_container } from '../../../styles/miscStyles';

import BackButton from '../../../components/misc/backButton';
import GroupButton from '../../../components/workout/setup/groupButton';
import WorkoutInput from '../../../components/workout/setup/workoutInput';

import { GetCorrectWorkoutInput } from '../../../helpers/workoutValidations';



const NAME_MAX_LENGTH = 40;

export default function SetupWorkoutExerciseScreen({ navigation }){
    const [name, setName] = React.useState(null);
    const [sets, setSets] = React.useState(null);
    const [rest, setRest] = React.useState(null);
    const [isLastUntilFailure, setIsLastUntilFailure] = React.useState(null);
    const [type, setType] = React.useState(0);

    const [minReps, setMinReps] = React.useState(null);
    const [maxReps, setMaxReps] = React.useState(null);
    
    const [duration, setDuration] = React.useState(null);

    const openPrevScreen = () => navigation.goBack();

    const addWorkout= () => navigation.navigate('SetupWorkoutDayScreen', (type == 0) ? {
        exercise: {
            key: null,
            name: name,
            description: `${(sets)?sets:'0'} sets X ${(minReps)?minReps:'0'} - ${(maxReps)?maxReps:'0'} reps / ${(rest)?rest:'0'}s rest`,
            sets: sets,
            type: type,
            minReps: minReps,
            maxReps: maxReps,
            rest: rest,
            isLastUntilFailure: isLastUntilFailure
        }
    } : {
        exercise: {
            key: null,
            name: name,
            description: `${(sets)?sets:'0'} sets X ${(duration)?duration:'0'}s / ${(rest)?rest:'0'}s rest`,
            sets: sets,
            type: type,
            duration: duration,
            rest: rest,
            isLastUntilFailure: isLastUntilFailure
        }
    });

    // Sets
    const changeSetsHandler = (value) => setSets(value);
    const incSetsHandler = () => setSets(`${GetCorrectWorkoutInput(sets, true)}`);
    const decSetsHandler = () => setSets(`${GetCorrectWorkoutInput(sets, false)}`);
    
    // MinReps
    const changeMinRepsHandler = (value) => setMinReps(value);
    const incMinRepsHandler = () => setMinReps(`${GetCorrectWorkoutInput(minReps, true)}`);
    const decMinRepsHandler = () => setMinReps(`${GetCorrectWorkoutInput(minReps, false)}`);
    
    // MaxReps
    const changeMaxRepsHandler = (value) => setMaxReps(value);
    const incMaxRepsHandler = () => setMaxReps(`${GetCorrectWorkoutInput(maxReps, true)}`);
    const decMaxRepsHandler = () => setMaxReps(`${GetCorrectWorkoutInput(maxReps, false)}`);
    
    // Duration
    const changeDurationHandler = (value) => setDuration(value);
    const incDurationHandler = () => setDuration(`${GetCorrectWorkoutInput(duration, true)}`);
    const decDurationHandler = () => setDuration(`${GetCorrectWorkoutInput(duration, false)}`);
    
    // Rest
    const changeRestHandler = (value) => setRest(value);
    const incRestHandler = () => setRest(`${GetCorrectWorkoutInput(rest, true)}`);
    const decRestHandler = () => setRest(`${GetCorrectWorkoutInput(rest, false)}`);

    const toggleSwitch = () => setIsLastUntilFailure(!isLastUntilFailure);

    return(
        <SafeAreaView style={container}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={[content, {width: '100%', justifyContent: 'flex-start'}]}>
                <Text style={styles.title}>Exercise Name</Text>

                <TextInput
                    style={styles.entry}
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

                        <WorkoutInput
                            value={sets}
                            onChangeHandler={changeSetsHandler}
                            incValueHandler={incSetsHandler}
                            decValueHandler={decSetsHandler}/>
                    </View>

                    {(type == 0) ? 
                    <>
                        <View style={[styles.subBox, {marginTop: 16}]}>
                            <Text style={styles.text}>Min Reps</Text>

                            <WorkoutInput
                                value={minReps}
                                onChangeHandler={changeMinRepsHandler}
                                incValueHandler={incMinRepsHandler}
                                decValueHandler={decMinRepsHandler}/>
                        </View>

                        <View style={[styles.subBox, {marginTop: 16}]}>
                            <Text style={styles.text}>Max Reps</Text>

                            <WorkoutInput
                                value={maxReps}
                                onChangeHandler={changeMaxRepsHandler}
                                incValueHandler={incMaxRepsHandler}
                                decValueHandler={decMaxRepsHandler}/>
                        </View>
                    </>
                    : 
                        <View style={[styles.subBox, {marginTop: 16}]}>
                            <Text style={styles.text}>Duration</Text>

                            <WorkoutInput
                                value={duration}
                                onChangeHandler={changeDurationHandler}
                                incValueHandler={incDurationHandler}
                                decValueHandler={decDurationHandler}/>
                        </View>
                    }

                    <View style={[styles.subBox, {marginTop: 16}]}>
                        <Text style={styles.text}>Rest</Text>

                        <WorkoutInput
                            value={rest}
                            onChangeHandler={changeRestHandler}
                            incValueHandler={incRestHandler}
                            decValueHandler={decRestHandler}/>
                    </View>

                    <View style={[styles.subBox, {marginTop: 16}]}>
                        <Text style={styles.text}>Last Set Until Failure</Text>

                        <Switch
                            style={{marginRight: 48}}
                            trackColor={{ false: 'black', true: 'white' }}
                            thumbColor={(isLastUntilFailure) ? 'white' : 'white'}
                            onValueChange={toggleSwitch}
                            value={isLastUntilFailure} />
                    </View>
                </View>

            </View>
        
            <TouchableOpacity
                style={styles.add}
                onPress={addWorkout}>
                <Text>Add</Text>
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

    box: {
        width: '100%',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'gray',
        marginTop: 16
    },

    subBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    text: {
        fontSize: 16
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