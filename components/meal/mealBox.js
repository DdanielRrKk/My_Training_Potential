import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';

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
                        <EvilIcons name="plus" size={40} color={PRIMARY_COLOR} />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerBottom}>
                    <Text style={styles.subText}>{totalCalories} cal</Text>
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
                <EvilIcons name="plus" size={40} color={PRIMARY_COLOR} />
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
        backgroundColor: SECONDARY_COLOR,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },
    subText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
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
        backgroundColor: SECONDARY_COLOR
    },
    containerBottom: {
        width: '100%',
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
});