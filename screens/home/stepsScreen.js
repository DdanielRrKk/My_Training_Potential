import React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';

import { GetStepsScreenData } from '../../database/screen/home/steps_services';

import { stylesMisc } from '../../styles/miscStyles';

import BackButton from '../../components/misc/backButton';
import { StepsLogItemList } from '../../components/home/logItemList';



export default function StepsScreen({ navigation }){
    const [stepsLog, setStepsLog] = React.useState(null);
    
    React.useEffect(() => {
        let isGood = true;
        GetStepsScreenData().then((stepsLog) => { if(isGood) setStepsLog(stepsLog); });
        return () => { isGood = false; } // to prevent memory leaks (clean up)
    }, []);

    const openPrevScreen = () => navigation.goBack();
 
    return(
        <SafeAreaView style={stylesMisc.container}>
            <ScrollView style={stylesMisc.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={stylesMisc.back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={stylesMisc.content_start}>
                    <Text style={stylesMisc.subtitle}>Steps History</Text>
                    
                    {stepsLog ? <>{StepsLogItemList(stepsLog)}</> : null }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
