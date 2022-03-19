import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';



export default function SetupWorkoutBox({ style, pressHandler, day, workoutName }){    
    if(workoutName != null) {
        return(
            <View style={[styles.bigContainer, style]}>
                <View style={styles.containerTop}>
                    <Text style={styles.text}>{day}</Text>
        
                    <TouchableOpacity onPress={() => pressHandler()}>
                        <Feather name="edit-2" size={28} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerBottom}>
                    <Text style={styles.text}>{workoutName}</Text>
                </View>
            </View>
        );
    }

    return(
        <View style={[styles.container, style]}>
            <Text style={styles.text}>{day}</Text>

            <TouchableOpacity onPress={() => pressHandler()}>
                <EvilIcons name="plus" size={38} color="black" />
            </TouchableOpacity>
        </View>
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
