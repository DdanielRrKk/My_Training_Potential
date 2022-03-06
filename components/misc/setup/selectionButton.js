import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function SelectionButton({ style, is_selected, title, pressHandler }){
    if(is_selected && is_selected !== null) {
        return(
            <TouchableOpacity 
                style={[styles.button, styles.button_selected, style]}
                onPress={pressHandler}>
                    <Text style={styles.text_selected}>{title}</Text>
            </TouchableOpacity>
        );
    }
    
    return(
        <TouchableOpacity 
            style={[styles.button, styles.button_not_selected, style]}
            onPress={pressHandler}>
                <Text style={styles.text_not_selected}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button_selected: {
        backgroundColor: 'black',
    },
    text_selected: {
        color: 'white',
    },
    
    button_not_selected: {
        backgroundColor: 'transparent',
    },
    text_not_selected: {
        color: 'black',
    }
});