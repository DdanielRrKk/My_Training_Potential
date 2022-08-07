import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { EvilIcons } from '@expo/vector-icons';

import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';



export function ExerciseItem({ 
    item,
    finishValueHandler,
    incValueHandler,
    decValueHandler,
    startDurationHandler
}){
    const ICON_SIZE = 48;

    if(item.type == -1) {
        return (
            <View style={styles.box1}>
                <Text style={styles.headerText}>{item.name}</Text>
            </View>
        );
    }

    if(item.type == 0) {
        if(item.isFinished) return (
            <View style={styles.box2Checked}>
                <Text style={styles.textNameChecked}>{item.name}</Text>

                <View style={styles.valueBox}>
                    <Text style={styles.subTextChecked}>Reps</Text>

                    <Text style={styles.textValueChecked}>{item.value}</Text>
                </View>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => finishValueHandler(item.key)}>
                    <EvilIcons name="check" size={ICON_SIZE} color={SECONDARY_COLOR} />
                </TouchableOpacity>
            </View>
        );

        return (
            <View style={styles.box2}>
                <Text style={styles.textName}>{item.name}</Text>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => decValueHandler(item.key, item.value)}>
                    <EvilIcons name="minus" size={ICON_SIZE} color={TERTIARY_COLOR} />
                </TouchableOpacity>

                <View style={styles.valueBox}>
                    <Text style={styles.subText}>Reps</Text>

                    <Text style={styles.textValue}>{item.value}</Text>
                </View>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => incValueHandler(item.key, item.value)}>
                    <EvilIcons name="plus" size={ICON_SIZE} color={TERTIARY_COLOR} />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => finishValueHandler(item.key)}>
                    <EvilIcons name="check" size={ICON_SIZE} color={TERTIARY_COLOR} />
                </TouchableOpacity>
            </View>
        );
    }

    if(item.type == 1) {
        if(item.isFinished) return (
            <View style={styles.box2Checked}>
                <Text style={styles.textNameChecked}>{item.name}</Text>
    
                <View style={styles.valueBox}>
                    <Text style={styles.subTextChecked}>Duration</Text>
    
                    <Text style={styles.textValueChecked}>{item.value}</Text>
                </View>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => finishValueHandler(item.key)}>
                    <EvilIcons name="check" size={ICON_SIZE} color={SECONDARY_COLOR}/>
                </TouchableOpacity>
            </View>
        );

        return (
            <View style={styles.box2}>
                <Text style={styles.textName}>{item.name}</Text>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => decValueHandler(item.key, item.value)}>
                    <EvilIcons name="minus" size={ICON_SIZE} color={TERTIARY_COLOR} />
                </TouchableOpacity>

                <View style={styles.valueBox}>
                    <Text style={styles.subText}>Duration</Text>

                    <Text style={styles.textValue}>{item.value}</Text>
                </View>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => incValueHandler(item.key, item.value)}>
                    <EvilIcons name="plus" size={ICON_SIZE} color={TERTIARY_COLOR} />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => startDurationHandler(item.key)}>
                    <EvilIcons name="play" size={ICON_SIZE} color={TERTIARY_COLOR} />
                </TouchableOpacity>
            </View>
        );
    }

    console.log('error with', item);
    return(<Text>Found an Error</Text>);
};




const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginVertical: 6,
        justifyContent: 'space-between',
        alignItems: 'center',
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
    box2Checked:{
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginBottom: 16,
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
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
    subText: {
        fontWeight: 'bold',
        color: TERTIARY_COLOR
    },
    valueBox: {
        alignItems:'center'
    },

    textNameChecked: {
        fontSize: 16,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },
    textValueChecked: {
        fontSize: 20,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },
    subTextChecked: {
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    }
})