import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';

import { container } from '../../styles/miscStyles';

import { calculateTimeString } from '../../helpers/timer';



export default function RestWorkoutScreen({ navigation, route }){
    const [restDuration, setRestDuration] = React.useState(null);
    const [restDurationString, setRestDurationString] = React.useState(null);

    const [next, setNext] = React.useState(0); // to activate useEffect, by passing different prop every time
    const [pause, setPause] = React.useState(false);

    React.useEffect(() => {
        if(route.params?.rest) setRestDuration(parseInt(route.params.rest));
        if(route.params?.next) setNext(parseInt(route.params.next));
    }, [route.params?.rest, route.params?.next]);

    // timer
    React.useEffect(() => {
        if(restDuration < 0) {
            navigation.navigate('StartWorkoutScreen', {next: next + 1});
            return;
        }
        const good = setTimeout(() => {
            if(pause) return;
            setRestDurationString(calculateTimeString(restDuration));
            setRestDuration(restDuration - 1);
        }, 1000);
        return () => clearTimeout(good);
    });

    const togglePause = () => setPause(!pause);
    const skipRest = () => navigation.navigate('StartWorkoutScreen', {next: next + 1});

    return(
        <SafeAreaView style={container}>
                <View style={styles.content}>
                    <Text style={styles.text}>{restDurationString}</Text>

                    <View style={styles.row}>
                        <TouchableOpacity
                            style={(pause) ? styles.btn_active : styles.btn_unactive}
                            onPress={togglePause}>
                            <Text style={styles.subtext}>{(pause) ? 'Continue' : 'Pause'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btn_active, {marginLeft: 16}]}
                            onPress={skipRest}>
                            <Text style={styles.subtext}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    content: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },

    text: {
        fontSize: 36,
        marginBottom: 16
    },
    subtext: {
        fontSize: 24
    },

    row: {
        flexDirection: 'row'
    },

    btn_active: {
        fontSize: 24,
        backgroundColor: 'lightgray',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10
    },
    btn_unactive: {
        fontSize: 24,
        backgroundColor: 'gray',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10
    }
});