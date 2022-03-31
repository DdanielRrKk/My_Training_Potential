import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import { GetWorkoutLogData } from '../../database/screen/home/logs_services';

import { container, back_button_container, shadow, subtitle } from '../../styles/miscStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../styles/colors';

import BackButton from '../../components/misc/backButton';



export default function WorkoutLogsScreen({ navigation }){
    const [workoutLog, setWorkoutLog] = React.useState([]);
    
    React.useEffect(() => {
        let isGood = true;
        GetWorkoutLogData().then((workoutLog) => { if(isGood) setWorkoutLog(workoutLog); });
        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, []);
    
    console.log('workoutLog', workoutLog);

    const openPrevScreen = () => navigation.goBack();
 
    return(
        <SafeAreaView style={container}>
            <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
                <View style={back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={styles.content}>
                    <Text style={subtitle}>Workouts History</Text>
                    
                    <>
                    { (workoutLog) ?
                    workoutLog.map((item) => (
                        <View key={item.key} style={[styles.box, shadow]}>
                            <Text style={styles.labels}>{item.name}</Text>
                
                            <Text style={styles.labels}>{item.date}</Text>
                        </View>
                    ))
                    : null }
                    </>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    labels: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR
    },

    box: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 18,
        borderRadius: 10,
        backgroundColor: SECONDARY_COLOR,
        marginBottom: 16
    },
});