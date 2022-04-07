import React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';

import { GetWorkoutLogData } from '../../database/screen/home/logs_services';

import { stylesMisc } from '../../styles/miscStyles';

import BackButton from '../../components/misc/backButton';
import { WorkoutLogItemList } from '../../components/home/logItemList';



export default function WorkoutLogsScreen({ navigation }){
    const [workoutLog, setWorkoutLog] = React.useState([]);
    
    React.useEffect(() => {
        let isGood = true;
        GetWorkoutLogData().then((workoutLog) => { if(isGood) setWorkoutLog(workoutLog); });
        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, []);
    
    console.log('workoutLog', workoutLog);

    const openPrevScreen = () => navigation.goBack();

    const openLog = (item) => navigation.navigate('OpenWorkoutLogScreen', {item: item}); 
 
    return(
        <SafeAreaView style={stylesMisc.container}>
            <ScrollView style={stylesMisc.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={stylesMisc.back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={stylesMisc.content_start}>
                    <Text style={stylesMisc.subtitle}>Workouts History</Text>
                    
                    {workoutLog ? <>{WorkoutLogItemList(workoutLog, openLog)}</> : null }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
