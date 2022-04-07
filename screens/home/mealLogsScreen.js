import React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';

import { GetMealLogData } from '../../database/screen/home/logs_services';

import { stylesMisc } from '../../styles/miscStyles';

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

    const openLog = (item) => navigation.navigate('OpenMealLogScreen', {item: item});
 
    return(
        <SafeAreaView style={stylesMisc.container}>
            <ScrollView style={stylesMisc.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={stylesMisc.back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={stylesMisc.content_start}>
                    <Text style={stylesMisc.subtitle}>Meals History</Text>
                    
                    {mealLog ? <>{MealLogItemList(mealLog, openLog)}</> : null }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
