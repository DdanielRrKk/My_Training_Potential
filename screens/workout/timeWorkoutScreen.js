import React from 'react';
import { Text, TouchableOpacity, View, SafeAreaView } from 'react-native';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesWorkout } from '../../styles/workoutStyles';

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
        <SafeAreaView style={stylesMisc.container}>
                <View style={stylesMisc.content}>
                    <Text style={stylesWorkout.subtext}>{(isDuration) ? 'Duration' : 'Rest'}</Text>

                    <Text style={stylesWorkout.text}>{timeDurationString}</Text>

                    <View style={stylesWorkout.row}>
                        <TouchableOpacity
                            style={(pause) ? stylesWorkout.btn_active : stylesWorkout.btn_unactive}
                            onPress={togglePause}>
                            <Text style={(pause) ? stylesWorkout.subtext_active : stylesWorkout.subtext_unactive}>{(pause) ? 'Continue' : 'Pause'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={stylesWorkout.btn_active_down}
                            onPress={skipRest}>
                            <Text style={stylesWorkout.subtext_active}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </SafeAreaView>
    );
};
