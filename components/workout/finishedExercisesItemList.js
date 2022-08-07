import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { SECONDARY_COLOR,TERTIARY_COLOR } from '../../styles/colors';



export default function FinishedExercisesItemList(exercises){
    return (
        <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
            {exercises.map((item) => {
                if(item.type == -1) {
                    return (
                        <View key={item.key} style={styles.box1}>
                            <Text style={styles.headerText}>{item.name}</Text>
                        </View>
                    );
                }
                return (
                    <View key={item.key} style={styles.box2}>
                        <Text style={styles.textName}>{item.name}</Text>
            
                        <View style={styles.valueBox}>
                            <Text>{(item.type == 0)? 'Reps' : 'Duration'}</Text>
            
                            <Text style={styles.textValue}>{item.value}</Text>
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
};




const styles = StyleSheet.create({
    scrollContainer: {
        width: '100%'
    },
    box1:{
        flexDirection: 'row',
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box2:{
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8,
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
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: TERTIARY_COLOR
    },
    textName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: TERTIARY_COLOR
    },
    textValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: TERTIARY_COLOR
    },
    valueBox: {
        alignItems:'center'
    },
});
