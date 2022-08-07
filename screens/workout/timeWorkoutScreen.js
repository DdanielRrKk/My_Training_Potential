import React from 'react';
import { Text, TouchableOpacity, View, SafeAreaView } from 'react-native';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesWorkout } from '../../styles/workoutStyles';

import { calculateTimeDurationString } from '../../helpers/timer';



export default function TimeWorkoutScreen({ navigation, route }){
    const [duration, setDuration] = React.useState(null);
    const [durationString, setDurationString] = React.useState(null);

    const [rest, setRest] = React.useState(null);
    const [restString, setRestString] = React.useState(null);

    const [pause, setPause] = React.useState(false);
    const [isDuration, setIsDuration] = React.useState(false);

    // console.log('isDuration', isDuration);

    React.useEffect(() => {
        if(route.params?.isDuration) setIsDuration(route.params.isDuration);
        if(route.params?.duration) {
            setDuration(parseInt(route.params.duration) - 1);
            setDurationString(calculateTimeDurationString(parseInt(route.params.duration)));
        }
        if(route.params?.rest) {
            setRest(parseInt(route.params.rest) - 1);
            setRestString(calculateTimeDurationString(parseInt(route.params.rest)));
        }
    }, [
        route.params?.isDuration,
        route.params?.duration,
        route.params?.rest
    ]);

    // timer
    React.useEffect(() => {
        if(isDuration && duration < 0) setIsDuration(false);
        if(!isDuration && rest < 0) {
            navigation.navigate('StartWorkoutScreen');
            return;
        }
        const good = setTimeout(() => {
            if(pause) return;
            if(isDuration) {
                setDuration(duration - 1);
                setDurationString(calculateTimeDurationString(duration));
            }
            else {
                setRest(rest - 1);
                setRestString(calculateTimeDurationString(rest));
            }
        }, 1000);
        return () => clearTimeout(good);
    });

    const togglePause = () => setPause(!pause);
    const skipTime = () => {
        if(isDuration) {
            setIsDuration(false);
            return;
        }
        navigation.goBack();
    }

    return(
        <SafeAreaView style={(isDuration) ? stylesMisc.container : stylesWorkout.containerRest}>
            <View style={stylesMisc.content}>
                <Text style={(isDuration) ? stylesWorkout.subtext : stylesWorkout.subtextRest}>{(isDuration) ? 'Duration' : 'Rest'}</Text>

                <Text style={(isDuration) ? stylesWorkout.text : stylesWorkout.textRest}>{(isDuration) ? durationString : restString}</Text>

                <View style={stylesWorkout.row}>
                    <TouchableOpacity
                        style={(pause) ? stylesWorkout.btn_active : stylesWorkout.btn_unactive}
                        onPress={togglePause}>
                        <Text style={(pause) ? stylesWorkout.subtext_active : stylesWorkout.subtext_unactive}>{(pause) ? 'Continue' : 'Pause'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={stylesWorkout.btn_active_down}
                        onPress={skipTime}>
                        <Text style={stylesWorkout.subtext_active}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
