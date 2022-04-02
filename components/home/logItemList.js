import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';



export function MealLogItemList(log){
    return log.map((item) => (
        <View key={item.key} style={styles.container}>
            <Text style={styles.text}>{(item.calories == null) ? '0' : item.calories} cal</Text>

            <Text style={styles.text}>{item.date}</Text>
        </View>
    ));
};
export function WorkoutLogItemList(log){
    return log.map((item) => (
        <View key={item.key} style={styles.container}>
            <Text style={styles.text}>{item.name}</Text>

            <Text style={styles.text}>{item.date}</Text>
        </View>
    ));
};
export function WeightLogItemList(log){
    return log.map((item) => (
        <View key={item.key} style={styles.container}>
            <Text style={styles.text}>{item.weight} kg</Text>

            <Text style={styles.text}>{item.date}</Text>
        </View>
    ));
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
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },
});
