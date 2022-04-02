import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../styles/colors';

import { EvilIcons } from '@expo/vector-icons';



export default function NumberInput({ style, value, onChangeHandler, incValueHandler, decValueHandler, maxLength }){    
    return(
        <View style={[styles.container, style]}>
            <TouchableOpacity 
                style={styles.button}
                onPress={decValueHandler}>
                <EvilIcons name="minus" size={40} color={PRIMARY_COLOR} />
            </TouchableOpacity>

            <TextInput 
                style={styles.value}
                value={value}
                onChangeText={onChangeHandler}
                keyboardType='numeric'
                maxLength={maxLength}/>

            <TouchableOpacity 
                style={styles.button}
                onPress={incValueHandler}>
                <EvilIcons name="plus" size={40} color={PRIMARY_COLOR} />
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
    },

    value: {
        width: 70,
        textAlign: 'center',
        color: SECONDARY_COLOR,
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10,
    },
});