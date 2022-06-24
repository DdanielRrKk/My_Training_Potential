import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';



export default function TextEntry({ style, onChangeText, value, maxLength, placeholder, isNumeric = false }){    
    if(isNumeric) {
        return(
            <TextInput
                style={[styles.entry, style]}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                keyboardType='numeric'
                maxLength={maxLength}/>
        );
    }

    return(
        <TextInput
            style={[styles.entry, style]}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}/>
    );
};



const styles = StyleSheet.create({
    entry:{
        width: '100%',
        color: TERTIARY_COLOR,
        paddingHorizontal: 16,
        paddingVertical: 5,
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 20,
        justifyContent: 'center',
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
});
