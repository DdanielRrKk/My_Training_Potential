import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../styles/colors';

import { AntDesign } from '@expo/vector-icons';



export default function SetupWorkoutAddButton({ pressHandler }){
    return(
        <TouchableOpacity style={styles.btn} onPress={() => pressHandler()}>
            <AntDesign name="plus" size={24} color={SECONDARY_COLOR} />
        </TouchableOpacity>
    );
};



export const styles = StyleSheet.create({
    btn: {
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2,
        paddingHorizontal: 16,
        marginBottom: 16,
        borderRadius: 10,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    }
});
