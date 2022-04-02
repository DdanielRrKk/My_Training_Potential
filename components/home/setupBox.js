import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';



export default function SetupBox({ pressHandler }){    
    return(
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => pressHandler()}>
                <Text style={styles.text}>Setup</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 80,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    button: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR
    },

    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    }
});
