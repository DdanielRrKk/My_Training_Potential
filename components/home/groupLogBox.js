import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { shadow } from '../../styles/miscStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../styles/colors';



export default function GroupLogBox({ pressHandler, title }){    
    return(
        <TouchableOpacity 
            style={[styles.container, shadow]}
            onPress={pressHandler}>
                <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '48%',
        paddingVertical: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR
    },

    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
});