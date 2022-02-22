import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';



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
        backgroundColor: 'gray'
    },

    button: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    },

    text: {
        fontSize: 20
    },
    subText: {
        fontSize: 16
    },
});