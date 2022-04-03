import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import { container, back_button_container, subtitle, content_start } from '../../styles/miscStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../styles/colors';

import BackButton from '../../components/misc/backButton';
import Header from '../../components/misc/header';
import ExercisesItemList from '../../components/workout/exercisesItemList';



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


    const openPrevScreen = () => navigation.goBack();

    return(
        <SafeAreaView style={container}>
            <View style={back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={content_start}>
                <Header title={name}/>

                <Text style={subtitle}>Details</Text>

                <View style={styles.header}>
                    <View style={styles.row}>
                        <Text style={styles.bigText}>Total Time</Text>
                        <Text style={styles.bigText}>{totalTime}</Text>
                    </View>
                    <View style={[styles.row, {marginTop: 16}]}>
                        <Text style={styles.bigText}>Date</Text>
                        <Text style={styles.bigText}>{date}</Text>
                    </View>
                </View>

                <Text style={subtitle}>Note</Text>

                <View style={styles.note_box}>
                    <Text style={styles.note_text}>{note}</Text>
                </View>

                <Text style={subtitle}>Exercises</Text>

                <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        {exercises ? <>{ExercisesItemList(exercises)}</> : null }
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    header: {
        backgroundColor: PRIMARY_COLOR,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        borderRadius: 10,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },

    bigText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },

    row: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },

    note_box: {
        width: '100%',
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 10,
        padding: 16,
        shadowColor: TERTIARY_COLOR,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3,
    },
    note_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    }
});
