import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';



function getDayName(day_number) {
    switch(day_number) {
        case 1: return 'Monday';
        case 1: return 'Tuesday';
        case 1: return 'Wednesday';
        case 1: return 'Thursday';
        case 1: return 'Friday';
        case 1: return 'Saturday';
        case 1: return 'Sunday';
        default: return null;
    }
}

export default function WorkoutBox({ style, startHandler, openHandler, isToday, day }){ 
    console.log('day.name', day.name);
    console.log('day.exercises.length', day.exercises.length);  

    if((day.name == null || day.exercises == 0) && (isToday || !isToday)) {
        return(
            <View style={[styles.container, style]}>
                <Text style={styles.text}>{getDayName(day.day_number)}</Text>
                
                <Text style={styles.text}>Rest</Text>
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
                    <Text style={styles.text}>{getDayName(day.day_number)}</Text>
                    
                    <Text style={styles.text}>{workout_name}</Text>
                    <Text style={styles.subtext}>{exercises_count} exercises</Text>
                </View>

                <TouchableOpacity 
                    style={styles.containerBottom}
                    onPress={() => startHandler()}>
                    <Text style={styles.text}>Start</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    return(
        <TouchableOpacity 
            style={[styles.container, style]}
            onPress={() => openHandler()}>
            <Text style={styles.text}>{getDayName(day.day_number)}</Text>
            
            <Text style={styles.text}>{workout_name}</Text>
            <Text style={styles.subtext}>{exercises_count} exercises</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 16,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'gray'
    },

    text: {
        fontSize: 18
    },
    subtext: {
        fontSize: 16
    },


    bigContainer: {
        width: '100%',
    },
    containerTop: {
        flexDirection: 'row',
        width: '100%',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'gray'
    },
    containerBottom: {
        width: '100%',
        padding: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
});