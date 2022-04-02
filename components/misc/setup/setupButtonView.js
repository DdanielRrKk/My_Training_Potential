import React from 'react';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../styles/colors';



export default function SetupButtonView({ style, pressHandler }){    
    return(
        <SafeAreaView style={style}>
            <TouchableOpacity 
                style={styles.setUp}
                onPress={pressHandler}>
                <Text style={styles.setupText}>Set Up Plan</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    setUp: {
        backgroundColor: PRIMARY_COLOR,
        width: '100%',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
    setupText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },
});
