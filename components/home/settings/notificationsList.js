import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../styles/colors';
import { getCorrectTimeString } from '../../../helpers/timer';

import { Feather } from '@expo/vector-icons';



function getTimeText(weekDay) {
    switch(weekDay) {
        case 0: return 'Day';
        case 1: return 'Monday';
        case 2: return 'Tuesday';
        case 3: return 'Wednesday';
        case 4: return 'Thursday';
        case 5: return 'Friday';
        case 6: return 'Saturday';
        case 7: return 'Sunday';
        default: return '';
    }
}

export default function NotificationsList(notifications, editNotificationHandler, askForDeletingNotificationHadler){
    return notifications.map((item) => {
        const readyHour = getCorrectTimeString(item.hour);
        const readyMinutes = getCorrectTimeString(item.minute);
        const weekDayText = getTimeText(item.weekDay);
        return(
            <View key={item.key} style={styles.container}>
                <View style={styles.col}>
                    <Text style={styles.text}>{item.title}</Text>
    
                    <Text style={styles.text}>{item.message}</Text>
                    
                    <Text style={styles.text}>Every {weekDayText} at {readyHour}:{readyMinutes}</Text>
                </View>
    
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button1} onPress={() => editNotificationHandler(item.key)}>
                        <Feather name="edit-2" size={24} color={TERTIARY_COLOR} />
                    </TouchableOpacity>
    
                    <TouchableOpacity onPress={() => askForDeletingNotificationHadler(item.key)}>
                        <Feather name="x-circle" size={24} color={TERTIARY_COLOR} />
                    </TouchableOpacity>
                </View>
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
    col: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    row: {
        flexDirection: 'row'
    },
    number: {
        fontSize: 16,
        fontWeight: 'bold',
        color: TERTIARY_COLOR
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },
    button1: {
        marginHorizontal: 16
    }
});
