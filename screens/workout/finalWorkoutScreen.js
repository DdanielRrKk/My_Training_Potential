import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';

import { SetWorkoutLogData } from '../../database/screen/workout/final_workout_services';

import { container, content, subtitle } from '../../styles/miscStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';

import ActionButton from '../../components/misc/actionButton';
import Header from '../../components/misc/header';

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
        SetWorkoutLogData(dayName, totalTime, finishedExercises, note);
        navigation.setOptions({ tabBarVisible: true });
        navigation.navigate('TabNavigation');
    }

    return(
        <SafeAreaView style={container}>
            <KeyboardAvoidingView style={{flex: 1, width: '100%'}}>
                
                    <View style={content}>
                        <Header title={dayName}/>

                        <Text style={subtitle}>Total Time</Text>

                        <View style={styles.header}>
                            <Text style={[styles.bigText, {fontSize: 18}]}>{totalTime}</Text>
                        </View>

                        <Text style={subtitle}>Note</Text>

                        <View style={styles.note_box}>
                            <TextInput
                                style={styles.note}
                                placeholder='(optional)'
                                onChangeText={setNote}
                                value={note}
                                maxLength={LONG_TEXT_MAX_LENGTH}
                                multiline={true}
                                numberOfLines={4}/>
                        </View>

                        <Text style={subtitle}>Exercises</Text>

                        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                {finishedExercises.map((item) => (
                                    <View key={item.key} style={styles.box}>
                                        <Text style={[styles.bigText, {alignSelf: 'center'}]}>{item.name}</Text>
                                                
                                        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={styles.bigText}>Sets</Text>

                                            <Text style={styles.bigText}>{item.sets}</Text>
                                        </View>

                                        {(item.type == 0) ? 
                                        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={styles.bigText}>Total Reps</Text>

                                            <Text style={styles.bigText}>{item.totals}</Text>
                                        </View>
                                        :
                                        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Text style={styles.bigText}>Total Duration</Text>

                                            <Text style={styles.bigText}>{item.totals}s</Text>
                                        </View>
                                        }
                                    </View>
                                ))}
                            </View>
                        </ScrollView>

                        <ActionButton title='Finish' pressHandler={finish}/>
                    </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    header: {
        backgroundColor: SECONDARY_COLOR,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 10,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    bigText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },

    box: {
        width: '100%',
        padding: 16,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: SECONDARY_COLOR,
        marginBottom: 16,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
    
    note_box: {
        flexDirection: 'row',
        width: '100%',
        padding: 16,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
        marginBottom: 16,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
    note: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: SECONDARY_COLOR,
        color: TERTIARY_COLOR
    },
});
