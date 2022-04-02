import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';



export default function WaterBox({ style, addWaterHandler, removeWaterHandler, mililiters }){    
    return(
        <View style={[styles.container, style]}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => removeWaterHandler()}>
                <Text style={styles.subText}>-250 ml</Text>
            </TouchableOpacity>

            <Text style={styles.text}>{(mililiters == null) ? 0 : mililiters} ml</Text>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => addWaterHandler()}>
                <Text style={styles.subText}>+250 ml</Text>
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
        backgroundColor: SECONDARY_COLOR,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    button: {
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 5,
        padding: 6
    },

    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },
    subText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },
});