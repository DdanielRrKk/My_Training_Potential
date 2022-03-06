import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

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
                    <EvilIcons name="close-o" size={38} color="black" />
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
        backgroundColor: 'gray'
    },

    title: {
        fontSize: 18
    },
    text: {
        fontSize: 14
    },


    bigContainer: {
        width: '100%',
    },
    containerTop: {
        flexDirection: 'row',
        width: '100%',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'gray'
    },
    containerBottom: {
        width: '100%',
        padding: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
});