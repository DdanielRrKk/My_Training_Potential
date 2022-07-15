import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';



export default function CalculatorBox({ pressHandler, title }){    
    return(
        <TouchableOpacity 
            style={styles.container}
            onPress={() => pressHandler()}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    }
});
