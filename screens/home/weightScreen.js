import React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';

import { GetWeightScreenData, SetWeightLogData } from '../../database/screen/home/weight_services';

import { container, back_button_container, content_start, subtitle } from '../../styles/miscStyles';

import BackButton from '../../components/misc/backButton';
import WeightPopup from '../../components/home/weightPopup';
import ActionButton from '../../components/misc/actionButton';
import { WeightLogItemList } from '../../components/home/logItemList';



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

                <View style={content_start}>
                    <Text style={subtitle}>Weight History</Text>
                    
                    {weightLog ? <>{WeightLogItemList(weightLog)}</> : null }
                </View>
            </ScrollView>

            <ActionButton title='Add' pressHandler={openPopup}/>
        </SafeAreaView>
    );
};
