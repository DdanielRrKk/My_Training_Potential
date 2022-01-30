import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';



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
        backgroundColor: 'gray'
    },

    button: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },

    text: {
        color: 'white'
    }
});