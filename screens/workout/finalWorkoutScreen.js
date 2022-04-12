import React from 'react';
import { Text, View, TextInput, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';

import { SetWorkoutLogData } from '../../database/screen/workout/final_workout_services';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesWorkout } from '../../styles/workoutStyles';

import ActionButton from '../../components/misc/actionButton';
import Header from '../../components/misc/header';
import ExercisesItemList from '../../components/workout/exercisesItemList';

import { LONG_TEXT_MAX_LENGTH } from '../../helpers/constants';



export default function FinalWorkoutScreen({ navigation, route }){
    const [dayName, setDayName] = React.useState(null);
    const [totalTime, setTotalTime] = React.useState(null);
    const [finishedExercises, setFinishedExercises] = React.useState([]);
    const [note, setNote] = React.useState(null);
    
    React.useEffect(() => {
        console.log('route.params?.day_name', route.params?.day_name);
        console.log('route.params?.total_time', route.params?.total_time);
        console.log('route.params?.finished_exercises', route.params?.finished_exercises);
        if(route.params?.day_name) setDayName(route.params?.day_name);
        if(route.params?.total_time) setTotalTime(route.params?.total_time);
        if(route.params?.finished_exercises) setFinishedExercises(route.params?.finished_exercises);
    }, [, route.params?.day_name, route.params?.total_time, route.params?.finished_exercises]);

    const finish = () => {
        SetWorkoutLogData(dayName, totalTime, finishedExercises, note).then(() => {
            navigation.setOptions({ tabBarVisible: true });
            navigation.navigate('TabNavigation');
        });
    }

    return(
        <SafeAreaView style={stylesMisc.container}>
            <KeyboardAvoidingView style={stylesMisc.keyboardContainer}>
                
                    <View style={stylesMisc.content}>
                        <Header title={dayName}/>

                        <Text style={stylesMisc.subtitle}>Total Time</Text>

                        <View style={stylesWorkout.header}>
                            <Text style={stylesWorkout.bigText}>{totalTime}</Text>
                        </View>

                        <Text style={stylesMisc.subtitle}>Note</Text>

                        <View style={stylesWorkout.note_box}>
                            <TextInput
                                style={stylesWorkout.note}
                                placeholder='(optional)'
                                onChangeText={setNote}
                                value={note}
                                maxLength={LONG_TEXT_MAX_LENGTH}
                                multiline={true}
                                numberOfLines={4}/>
                        </View>

                        <Text style={stylesMisc.subtitle}>Exercises</Text>

                        <ScrollView style={stylesMisc.scrollContent} showsVerticalScrollIndicator={false}>
                            <View style={stylesMisc.view}>
                                {finishedExercises ? <>{ExercisesItemList(finishedExercises)}</> : null }
                            </View>
                        </ScrollView>

                        <ActionButton title='Finish' pressHandler={finish}/>
                    </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
