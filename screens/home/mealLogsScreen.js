import React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';

import { GetMealLogData } from '../../database/screen/home/logs_services';

import { container, back_button_container, content_start, subtitle } from '../../styles/miscStyles';

import BackButton from '../../components/misc/backButton';
import { MealLogItemList } from '../../components/home/logItemList';



export default function MealLogsScreen({ navigation }){
    const [mealLog, setMealLog] = React.useState([]);
    
    React.useEffect(() => {
        let isGood = true;
        GetMealLogData().then((mealLog) => { if(isGood) setMealLog(mealLog); });
        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, []);

    console.log('mealLog', mealLog);

    const openPrevScreen = () => navigation.goBack();
 
    return(
        <SafeAreaView style={container}>
            <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
                <View style={back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={content_start}>
                    <Text style={subtitle}>Meals History</Text>
                    
                    {mealLog ? <>{MealLogItemList(mealLog)}</> : null }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
