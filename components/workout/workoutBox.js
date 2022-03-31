import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { shadow } from '../../styles/miscStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../styles/colors';

import { getDayName } from '../../helpers/workoutHelper';



export default function WorkoutBox({ style, startHandler, openHandler, isToday, day }){ 
    const day_name = getDayName(day.day_number);

    if((day.name == null || day.exercises == 0) && (isToday || !isToday)) {
        return(
            <View style={[styles.container, style, shadow]}>
                <Text style={styles.text}>{day_name}</Text>
                
                <Text style={[styles.text, {marginTop: 16, alignSelf: 'flex-start'}]}>Rest</Text>
            </View>
        );
    }

    const workout_name = day.name;
    const exercises_count = day.exercises.length;

    if(day.name != null && isToday) {
        return(
            <TouchableOpacity 
                style={[styles.bigContainer, style]}
                onPress={() => openHandler()}>
                <View style={styles.containerTop}>
                    <Text style={styles.text}>{day_name}</Text>
                
                    <View style={styles.containerSmall}>
                        <Text style={styles.text}>{workout_name}</Text>
                        <Text style={styles.subtext}>{exercises_count} exercises</Text>
                    </View>
                </View>

                <TouchableOpacity 
                    style={[styles.containerBottom, shadow]}
                    onPress={() => startHandler()}>
                    <Text style={styles.stratText}>Start</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    return(
        <TouchableOpacity 
            style={[styles.container, style, shadow]}
            onPress={() => openHandler()}>
            <Text style={styles.text}>{day_name}</Text>
            
            <View style={styles.containerSmall}>
                <Text style={styles.text}>{workout_name}</Text>
                <Text style={styles.subtext}>{exercises_count} exercises</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR
    },

    containerSmall: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16
    },

    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },
    subtext: {
        fontSize: 16,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },
    stratText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },


    bigContainer: {
        width: '100%',
    },
    containerTop: {
        width: '100%',
        padding: 16,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR
    },
    containerBottom: {
        width: '100%',
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR
    },
});