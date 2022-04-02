import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../styles/colors';



export default function SettingsOption({ pressHandler, title, isImportant = false }){   
    if(isImportant) {
        return(
            <TouchableOpacity
                style={styles.containerImportant}
                onPress={pressHandler}>
                <Text style={styles.titleImportant}>{title}</Text>
            </TouchableOpacity>
        );
    } 

    return(
        <TouchableOpacity
            style={styles.container}
            onPress={pressHandler}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 16,
        borderRadius: 10,
        backgroundColor: PRIMARY_COLOR,
        marginBottom: 16,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },

    containerImportant: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 16,
        padding: 16
    },
    titleImportant: {
        fontSize: 16,
        color: 'red'
    },
});
