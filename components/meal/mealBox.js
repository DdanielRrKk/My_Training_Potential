import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { EvilIcons } from '@expo/vector-icons';



export default function MealBox({ style, pressHandler, openHandler, title, totalCalories }){    
    if(totalCalories != 0 && totalCalories != null) {
        return(
            <TouchableOpacity 
                style={[styles.bigContainer, style]}
                onPress={() => openHandler()}>
                <View style={styles.containerTop}>
                    <Text style={styles.text}>{title}</Text>
        
                    <TouchableOpacity onPress={() => pressHandler()}>
                        <EvilIcons name="plus" size={38} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerBottom}>
                    <Text style={styles.text}>{totalCalories} cal</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return(
        <TouchableOpacity 
            style={[styles.container, style]}
            onPress={() => openHandler()}>
            <Text style={styles.text}>{title}</Text>

            <TouchableOpacity onPress={() => pressHandler()}>
                <EvilIcons name="plus" size={38} color="black" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 16,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'gray'
    },

    text: {
        fontSize: 18
    },


    bigContainer: {
        width: '100%',
    },
    containerTop: {
        flexDirection: 'row',
        width: '100%',
        padding: 16,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'gray'
    },
    containerBottom: {
        width: '100%',
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
});