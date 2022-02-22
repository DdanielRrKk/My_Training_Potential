import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ContinueButton({ pressHandler }){    
    return(
        <TouchableOpacity 
            style={styles.button}
            onPress={pressHandler}>
                <Text style={styles.text}>Continue</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button:{
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text:{
        justifyContent: 'center',
        alignItems: 'center',
    }
});