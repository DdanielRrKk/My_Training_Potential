import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { shadow } from '../../styles/miscStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../styles/colors';



export default function LogBox({ pressHandler, value, title }){    
    return(
        <TouchableOpacity 
            style={[styles.container, shadow]}
            onPress={() => pressHandler()}>
            <Text style={styles.text}>{(value == null) ? 0 : value}</Text>
            <Text style={styles.subtext}>{title}</Text>
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
        backgroundColor: SECONDARY_COLOR
    },

    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },

    subtext: {
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    }
});