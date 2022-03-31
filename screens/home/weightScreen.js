import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

import { GetWeightScreenData, SetWeightLogData } from '../../database/screen/home/weight_services';

import { container, back_button_container, shadow, subtitle } from '../../styles/miscStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../styles/colors';

import BackButton from '../../components/misc/backButton';
import WeightPopup from '../../components/home/weightPopup';
import ActionButton from '../../components/misc/actionButton';



export default function WeightScreen({ navigation }){
    const [weightLog, setWeightLog] = React.useState(null);
    const [popupFlag, setPopupFlag] = React.useState(false);
    const [currentWeight, setCurrentWeight] = React.useState('0');
    
    React.useEffect(() => {
        let isGood = true;
        GetWeightScreenData().then(({weightLog, weight}) => { 
            if(isGood) {
                setWeightLog(weightLog);
                if(!popupFlag) setCurrentWeight(weight);
            } 
        });
        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, [weightLog]);

    const openPrevScreen = () => navigation.goBack();

    const updateWeightLog = () => {
        SetWeightLogData(currentWeight);
        setPopupFlag(false);
    }

    const openPopup = () => setPopupFlag(true);
    const closePopup = () => setPopupFlag(false);
    const changeWeight = (value) => setCurrentWeight(value);
 
    return(
        <SafeAreaView style={container}>

            <WeightPopup 
                flag={popupFlag}
                closeHandler={closePopup}
                weight={currentWeight}
                weightChangeHandler={changeWeight}
                updateHandler={updateWeightLog}/>

            <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
                <View style={back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={styles.content}>
                    <Text style={subtitle}>Weight History</Text>
                    
                    <>
                    { (weightLog) ?
                    weightLog.map((item) => (
                        <View key={item.key} style={[styles.box, shadow]}>
                            <Text style={styles.labels}>{item.weight} kg</Text>
                
                            <Text style={styles.labels}>{item.date}</Text>
                        </View>
                    ))
                    : null }
                    </>
                </View>
            </ScrollView>

            <ActionButton title='Add' pressHandler={openPopup}/>
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