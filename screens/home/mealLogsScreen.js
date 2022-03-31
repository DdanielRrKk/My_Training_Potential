import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

import { GetMealLogData } from '../../database/screen/home/logs_services';

import { container, back_button_container, shadow, subtitle } from '../../styles/miscStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../styles/colors';

import BackButton from '../../components/misc/backButton';



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

                <View style={styles.content}>
                    <Text style={subtitle}>Meals History</Text>
                    
                    <>
                    { (mealLog) ?
                    mealLog.map((item) => (
                        <View key={item.key} style={[styles.box, shadow]}>
                            <Text style={styles.labels}>{(item.calories == null) ? '0' : item.calories} cal</Text>
                
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