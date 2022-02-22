import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { EvilIcons } from '@expo/vector-icons';



export default function MealBox({ style, pressHandler, title }){    
    return(
        <View style={[styles.container, style]}>
            <Text style={styles.text}>{title}</Text>

            <TouchableOpacity onPress={() => pressHandler()}>
                <EvilIcons name="plus" size={38} color="black" />
            </TouchableOpacity>
        </View>
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
});