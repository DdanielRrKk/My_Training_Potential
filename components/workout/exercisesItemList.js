import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';



export default function ExercisesItemList(exercises){
    return exercises.map((item) => (
        <View key={item.key} style={styles.box}>
            <Text style={[styles.text, {alignSelf: 'center'}]}>{item.name}</Text>
                    
            <View style={styles.row1}>
                <Text style={styles.text}>Sets</Text>

                <Text style={styles.textValue}>{item.sets}</Text>
            </View>

            {(item.type == 0) ? 
            <View style={styles.row2}>
                <Text style={styles.text}>Total Reps</Text>

                <Text style={styles.textValue}>{item.totals}</Text>
            </View>
            :
            <View style={styles.row2}>
                <Text style={styles.text}>Total Duration</Text>

                <Text style={styles.textValue}>{item.totals}s</Text>
            </View>
            }
        </View>
    ));
};

const styles = StyleSheet.create({
    box: {
        width: '100%',
        padding: 16,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: SECONDARY_COLOR,
        marginBottom: 16,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    row1: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginBottom: 8
    },
    row2: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },

    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },
    textValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: TERTIARY_COLOR
    }
});
