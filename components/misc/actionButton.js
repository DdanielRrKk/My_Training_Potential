import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';



export default function ActionButton({ title, pressHandler }){    
    return(
        <TouchableOpacity
            style={styles.add}
            onPress={pressHandler}>
            <Text style={styles.addText}>{title}</Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    add: {
        width: '100%',
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginTop: 16,
        alignItems: 'center',
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
    addText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    }
});