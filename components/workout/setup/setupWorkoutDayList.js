import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../styles/colors';

import { EvilIcons, Feather } from '@expo/vector-icons';



export default function SetupWorkoutDayList(workouts, pressHandler){
    return workouts.map((item) => {
        if(item.name != null) {
            return(
                <View key={item.day_number} style={styles.bigContainer}>
                    <View style={styles.containerTop}>
                        <Text style={styles.text}>Day {item.day_number}</Text>
            
                        <TouchableOpacity onPress={() => pressHandler(item.day_number)}>
                            <Feather name="edit-2" size={26} color={PRIMARY_COLOR} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerBottom}>
                        <Text style={styles.subText}>{item.name}</Text>
                    </View>
                </View>
            );
        }

        return(
            <View key={item.day_number} style={styles.container}>
                <Text style={styles.text}>Day {item.day_number}</Text>

                <TouchableOpacity onPress={() => pressHandler(item.day_number)}>
                    <EvilIcons name="plus" size={40} color={PRIMARY_COLOR} />
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
        marginBottom: 16,
    },
    containerTop: {
        flexDirection: 'row',
        width: '100%',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR
    },
    containerBottom: {
        width: '100%',
        padding: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
});
