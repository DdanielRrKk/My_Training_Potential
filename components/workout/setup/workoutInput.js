import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';

import { EvilIcons } from '@expo/vector-icons';



export default function WorkoutInput({ style, value, onChangeHandler, incValueHandler, decValueHandler }){    
    return(
        <View style={[styles.container, style]}>
            <TouchableOpacity 
                style={styles.button}
                onPress={decValueHandler}>
                <EvilIcons name="minus" size={36} color="black" />
            </TouchableOpacity>

            <TextInput 
                style={styles.value}
                value={value}
                onChangeText={onChangeHandler}
                keyboardType='numeric'/>

            <TouchableOpacity 
                style={styles.button}
                onPress={incValueHandler}>
                <EvilIcons name="plus" size={36} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'gray'
    },

    value: {
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10
    },
});