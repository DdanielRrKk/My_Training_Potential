import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesOpenLog } from '../../styles/homeStyles';

import BackButton from '../../components/misc/backButton';
import Header from '../../components/misc/header';
import FinishedExercisesItemList from '../../components/workout/finishedExercisesItemList';



export default function OpenWorkoutLogScreen({ navigation, route }){
    const [date, setDate] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [totalTime, setTotalTime] = React.useState(null);
    const [exercises, setExercises] = React.useState([]);
    const [note, setNote] = React.useState(null);

    React.useEffect(() => {
        console.log('route.params?.item', route.params?.item);
        if(route.params?.item) {
            setDate(route.params?.item.date);
            setName(route.params?.item.name);
            setNote(route.params?.item.note);
            setTotalTime(route.params?.item.total_time);
            setExercises(route.params?.item.finished_exercises);
        }
    }, [ route.params?.item ]);

    console.log('note', note);

    const openPrevScreen = () => navigation.goBack();

    return(
        <SafeAreaView style={stylesMisc.container}>
            <View style={stylesMisc.back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={stylesMisc.content_start}>
                <Header title={name}/>

                <Text style={stylesMisc.subtitle}>Details</Text>

                <View style={stylesOpenLog.header}>
                    <View style={stylesOpenLog.row}>
                        <Text style={stylesOpenLog.bigText}>Total Time</Text>
                        <Text style={stylesOpenLog.bigText}>{totalTime}</Text>
                    </View>
                    <View style={[stylesOpenLog.row, {marginTop: 16}]}>
                        <Text style={stylesOpenLog.bigText}>Date</Text>
                        <Text style={stylesOpenLog.bigText}>{date}</Text>
                    </View>
                </View>

                { note == null ? null :
                    <>
                        <Text style={stylesMisc.subtitle}>Note</Text>

                        <View style={stylesOpenLog.note_box}>
                            <Text style={stylesOpenLog.note_text}>{note}</Text>
                        </View>
                    </>
                }

                <Text style={stylesMisc.subtitle}>Exercises</Text>

                {exercises ? <>{FinishedExercisesItemList(exercises)}</> : null }
            </View>
        </SafeAreaView>
    );
};
