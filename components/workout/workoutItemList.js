import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';

import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function WorkoutItemList(exercises, editExerciseHandler, isSeeOnly = false){
    if(isSeeOnly) {
        return exercises.map((item) => (
            <View key={item.key} style={styles.container}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{marginLeft: 8}}>
                        <Text style={styles.text}>{item.name}</Text>
                        
                        {item.type == 0 ?
                        <View style={styles.row}>
                            <Text style={styles.number}>{(item.sets) ? item.sets : '0'}</Text>
                            <Text style={styles.text}> sets X </Text>
                            <Text style={styles.number}>{(item.minReps) ? item.minReps : '0'} - {(item.maxReps) ? item.maxReps : '0'}</Text>
                            <Text style={styles.text}> reps / </Text>
                            <Text style={styles.number}>{(item.rest) ? item.rest : '0'}s</Text>
                            <Text style={styles.text}> rest</Text>
                        </View>
                        :
                        <View style={styles.row}>
                            <Text style={styles.number}>{(item.sets) ? item.sets : '0'}</Text>
                            <Text style={styles.text}> sets X </Text>
                            <Text style={styles.number}>{(item.duration) ? item.duration : '0'}s</Text>
                            <Text style={styles.text}> / </Text>
                            <Text style={styles.number}>{(item.rest) ? item.rest : '0'}s</Text>
                            <Text style={styles.text}> rest</Text>
                        </View>
                        }
                    </View>
                </View>
            </View>
        ))
    }

    return exercises.map((item) => (
        <View key={item.key} style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{marginLeft: 8}}>
                    <Text style={styles.text}>{item.name}</Text>
                    
                    {item.type == 0 ?
                        <View style={styles.row}>
                            <Text style={styles.number}>{(item.sets) ? item.sets : '0'}</Text>
                            <Text style={styles.text}> sets X </Text>
                            <Text style={styles.number}>{(item.minReps) ? item.minReps : '0'} - {(item.maxReps) ? item.maxReps : '0'}</Text>
                            <Text style={styles.text}> reps / </Text>
                            <Text style={styles.number}>{(item.rest) ? item.rest : '0'}s</Text>
                            <Text style={styles.text}> rest</Text>
                        </View>
                        :
                        <View style={styles.row}>
                            <Text style={styles.number}>{(item.sets) ? item.sets : '0'}</Text>
                            <Text style={styles.text}> sets X </Text>
                            <Text style={styles.number}>{(item.duration) ? item.duration : '0'}s</Text>
                            <Text style={styles.text}> / </Text>
                            <Text style={styles.number}>{(item.rest) ? item.rest : '0'}s</Text>
                            <Text style={styles.text}> rest</Text>
                        </View>
                        }
                </View>
            </View>

            <TouchableOpacity onPress={() => editExerciseHandler(item)}>
                <MaterialCommunityIcons name="dots-vertical" size={28} color={TERTIARY_COLOR} />
            </TouchableOpacity>
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
});
