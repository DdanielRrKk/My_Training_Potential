import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';

import { EvilIcons } from '@expo/vector-icons';



export default function MealItemList(foods, deleteHandler){
    return foods.map((item) => {
        return (
            <View key={item.key} style={styles.container}>
                <View>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.text}>{item.calories} cal</Text>
                </View>

                <TouchableOpacity onPress={() => deleteHandler(item.key)}>
                    <EvilIcons name="close-o" size={40} color={PRIMARY_COLOR} />
                </TouchableOpacity>
            </View> 
        );
    });
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 16,
        marginBottom: 16,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },
});