import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';



export default function LogBox({ pressHandler, value, title }){    
    return(
        <TouchableOpacity 
            style={styles.container}
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
        backgroundColor: 'gray'
    },

    text: {
        color: 'black',
        fontSize: 18
    },

    subtext: {
        color: 'black'
    }
});