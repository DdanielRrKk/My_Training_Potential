import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';



export default function CalculatorPicker({ value, changeHandler }){    
    return(
        <View style={styles.container}>
            <Picker
                style={styles.picker}
                selectedValue={value}
                mode='dropdown'
                onValueChange={changeHandler}
                dropdownIconColor={PRIMARY_COLOR}>

                <Picker.Item style={styles.pickerItem} label='Body Mass Index' value='1' />
                <Picker.Item style={styles.pickerItem} label='Basal Metabloc Rate' value='2' />
                <Picker.Item style={styles.pickerItem} label='Body Fat Percentage' value='3' />
                <Picker.Item style={styles.pickerItem} label='Ideal Body Weight' value='4' />
                <Picker.Item style={styles.pickerItem} label='Lean Body Mass' value='5' />
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({    
    container: {
        width: '100%',
        marginBottom: 16,
        borderRadius: 10, 
        overflow: 'hidden',
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    picker: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: SECONDARY_COLOR,
    },

    pickerItem: {
        fontSize: 16,
        color: TERTIARY_COLOR
    },
});
