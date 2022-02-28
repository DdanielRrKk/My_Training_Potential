import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';

import { AntDesign } from '@expo/vector-icons';



export default function MealInput({ style, value, onChangeHandler, incValueHandler, decValueHandler }){    
    return(
        <View style={[styles.container, style]}>
            <TouchableOpacity 
                style={styles.button}
                onPress={decValueHandler}>
                <AntDesign name="minuscircleo" size={24} color="black" />
            </TouchableOpacity>

            <TextInput 
                style={styles.value}
                value={value}
                onChangeText={onChangeHandler}
                keyboardType='numeric'/>

            <TouchableOpacity 
                style={styles.button}
                onPress={incValueHandler}>
                <AntDesign name="pluscircleo" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'gray'
    },

    value: {
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10
    },
});