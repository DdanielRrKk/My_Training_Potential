import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function GroupLogBox({ pressHandler, title, value, subtitle }){    
    return(
        <TouchableOpacity 
            style={styles.container}
            onPress={pressHandler}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.value}>{value}</Text>
                <Text style={styles.title}>{subtitle}</Text>
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
        backgroundColor: 'gray'
    },

    title: {
        color: 'black',
    },

    value: {
        color: 'black',
        fontSize: 18
    },
});