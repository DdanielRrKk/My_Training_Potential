import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../styles/colors';

import { AntDesign } from '@expo/vector-icons';



const ICON_SIZE = 30;

export default function NotificationTimeChanger({ 
    weekDayValue,
    changeWeekDayHandler,
    
    incHourHandler,
    decHourHandler,
    hourValue,

    incMinuteHandler,
    decMinuteHandler,
    minuteValue // opravi dizaina i praveneto na takiwa izwestiq
}){    
    return(
        <View style={styles.container}>
            <View style={styles.containerPicker}>
                <Picker
                    style={styles.picker}
                    selectedValue={weekDayValue}
                    mode='dropdown'
                    onValueChange={changeWeekDayHandler}
                    dropdownIconColor={TERTIARY_COLOR}>
                    <Picker.Item style={styles.pickerItem} label='Every Day' value='0' />
                    <Picker.Item style={styles.pickerItem} label='Monday' value='1' />
                    <Picker.Item style={styles.pickerItem} label='Tuesday' value='2' />
                    <Picker.Item style={styles.pickerItem} label='Wednesday' value='3' />
                    <Picker.Item style={styles.pickerItem} label='Thursday' value='4' />
                    <Picker.Item style={styles.pickerItem} label='Friday' value='5' />
                    <Picker.Item style={styles.pickerItem} label='Saturday' value='6' />
                    <Picker.Item style={styles.pickerItem} label='Sunday' value='7' />
                </Picker> 
            </View>

            <View style={styles.containerSmall}>
                <TouchableOpacity
                    onPress={() => incHourHandler()}>
                    <AntDesign name="upcircleo" size={ICON_SIZE} color={PRIMARY_COLOR} />
                </TouchableOpacity>

                <View style={styles.col}>
                    <Text style={styles.text}>{hourValue}</Text>
                </View>

                <TouchableOpacity
                    onPress={() => decHourHandler()}>
                    <AntDesign name="circledowno" size={ICON_SIZE} color={PRIMARY_COLOR} />
                </TouchableOpacity>
            </View>

            <Text style={styles.text_middle}>:</Text>

            <View style={styles.containerSmall}>
                <TouchableOpacity
                    onPress={() => incMinuteHandler()}>
                    <AntDesign name="upcircleo" size={ICON_SIZE} color={PRIMARY_COLOR} />
                </TouchableOpacity>

                <View style={styles.col}>
                    <Text style={styles.text}>{minuteValue}</Text>
                </View>

                <TouchableOpacity
                    onPress={() => decMinuteHandler()}>
                    <AntDesign name="circledowno" size={ICON_SIZE} color={PRIMARY_COLOR} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerSmall: {
        width: '18%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerPicker: {
        width: '40%',
        borderRadius: 10, 
        overflow: 'hidden',
        marginRight: 16,
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
        fontWeight: 'bold',
        color: TERTIARY_COLOR
    },

    col: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginVertical: 8,
        borderRadius: 10,
        backgroundColor: SECONDARY_COLOR,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    text: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: TERTIARY_COLOR,
    },

    text_middle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: TERTIARY_COLOR,
        marginHorizontal: 16
    },

    subText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: TERTIARY_COLOR
    },
});
