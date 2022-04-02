import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';

import { container, content } from '../../styles/miscStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';

import { calculateTimeString } from '../../helpers/timer';



export default function TimeWorkoutScreen({ navigation, route }){
    const [timeDuration, setTimeDuration] = React.useState(null);
    const [timeDurationString, setTimeDurationString] = React.useState(null);

    const [pause, setPause] = React.useState(false);

    const [next, setNext] = React.useState(0); // to activate useEffect, by passing different prop every time
    const [isDuration, setIsDuration] = React.useState(false);

    console.log('isDuration', isDuration);

    React.useEffect(() => {
        if(route.params?.time) {
            setTimeDuration(parseInt(route.params.time) - 1);
            setTimeDurationString(calculateTimeString(route.params.time));
        }
        if(route.params?.next) setNext(parseInt(route.params.next));
        if(route.params?.isDuration) setIsDuration(route.params.isDuration);
    }, [route.params?.time, route.params?.next, route.params?.isDuration]);

    // timer
    React.useEffect(() => {
        if(timeDuration < 0) {
            navigation.navigate('StartWorkoutScreen', {next: next + 1});
            return;
        }
        const good = setTimeout(() => {
            if(pause) return;
            setTimeDuration(timeDuration - 1);
            setTimeDurationString(calculateTimeString(timeDuration));
        }, 1000);
        return () => clearTimeout(good);
    });

    const togglePause = () => setPause(!pause);
    const skipRest = () => {
        if(isDuration) {
            navigation.goBack();
            return;
        }

        navigation.navigate('StartWorkoutScreen', {next: next + 1});
        return;
    }

    return(
        <SafeAreaView style={container}>
                <View style={content}>
                    <Text style={styles.subtext}>{(isDuration) ? 'Duration' : 'Rest'}</Text>

                    <Text style={styles.text}>{timeDurationString}</Text>

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={(pause) ? styles.btn_active : styles.btn_unactive}
                            onPress={togglePause}>
                            <Text style={(pause) ? styles.subtext_active : styles.subtext_unactive}>{(pause) ? 'Continue' : 'Pause'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btn_active, {marginLeft: 16}]}
                            onPress={skipRest}>
                            <Text style={styles.subtext_active}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    text: {
        fontSize: 36,
        marginBottom: 16,
        fontWeight: 'bold',
        color: TERTIARY_COLOR
    },
    subtext: {
        fontSize: 24,
        fontWeight: 'bold',
        color: TERTIARY_COLOR
    },

    btn_active: {
        fontSize: 24,
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
    subtext_active: {
        fontSize: 24,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },
    btn_unactive: {
        fontSize: 24,
        backgroundColor: SECONDARY_COLOR,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
    subtext_unactive: {
        fontSize: 24,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },
});