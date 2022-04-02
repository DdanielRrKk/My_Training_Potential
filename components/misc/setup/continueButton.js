import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../styles/colors';



export default function ContinueButton({ pressHandler }){    
    return(
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.button}
                onPress={pressHandler}>
                    <Text style={styles.text}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    button:{
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    text:{
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    }
});