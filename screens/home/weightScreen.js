import React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';

import { GetWeightScreenData, SetWeightLogData } from '../../database/screen/home/weight_services';

import { stylesMisc } from '../../styles/miscStyles';

import BackButton from '../../components/misc/backButton';
import WeightPopup from '../../components/home/weightPopup';
import ActionButton from '../../components/misc/actionButton';
import { WeightLogItemList } from '../../components/home/logItemList';

import { IsInputTextValid } from '../../helpers/validations';
import { AlertOK } from '../../helpers/alerts';
import { ALERT_WARNING_TITLE, ALERT_WEIGHT_TEXT } from '../../helpers/constants';



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
        setPopupFlag(false);

        if(!IsInputTextValid(currentWeight)) {
            AlertOK(ALERT_WARNING_TITLE, ALERT_WEIGHT_TEXT, null);
            return;
        }

        SetWeightLogData(currentWeight);
    }

    const openPopup = () => setPopupFlag(true);
    const closePopup = () => setPopupFlag(false);
    const changeWeight = (value) => setCurrentWeight(value);
 
    return(
        <SafeAreaView style={stylesMisc.container}>

            <WeightPopup 
                flag={popupFlag}
                closeHandler={closePopup}
                weight={currentWeight}
                weightChangeHandler={changeWeight}
                updateHandler={updateWeightLog}/>

            <ScrollView style={stylesMisc.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={stylesMisc.back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={stylesMisc.content_start}>
                    <Text style={stylesMisc.subtitle}>Weight History</Text>
                    
                    {weightLog ? <>{WeightLogItemList(weightLog)}</> : null }
                </View>
            </ScrollView>

            <ActionButton title='Add' pressHandler={openPopup}/>
        </SafeAreaView>
    );
};
