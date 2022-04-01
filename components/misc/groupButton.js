import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';



export default function GroupButton({ is_selected, title, pressHandler }){
    if(is_selected && is_selected !== null) {
        return(
            <TouchableOpacity 
                style={[styles.button, styles.button_selected]}
                onPress={pressHandler}>
                    <Text style={styles.text_selected}>{title}</Text>
            </TouchableOpacity>
        );
    }
    
    return(
        <TouchableOpacity 
            style={[styles.button, styles.button_not_selected]}
            onPress={pressHandler}>
                <Text style={styles.text_not_selected}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '48%',
        paddingVertical: 8,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    button_selected: {
        backgroundColor: PRIMARY_COLOR,
    },
    text_selected: {
        color: SECONDARY_COLOR,
        fontWeight: 'bold'
    },
    
    button_not_selected: {
        backgroundColor: SECONDARY_COLOR,
    },
    text_not_selected: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold'
    }
});