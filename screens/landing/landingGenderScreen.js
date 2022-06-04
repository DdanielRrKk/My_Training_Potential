import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import { SetUserGender, GetUserGender } from '../../database/screen/landing_services';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesLanding } from '../../styles/landingStyles';

import ContinueButton from '../../components/misc/setup/continueButton';
import GroupButton from '../../components/misc/groupButton';
import BackButton from '../../components/misc/backButton';

import { AlertOK } from '../../helpers/alerts';
import { ALERT_WARNING_TITLE, ALERT_GENDER_TEXT } from '../../helpers/constants';



export default function LandingGenderScreen({ navigation }){
    const [gender, setGender] = React.useState(null);

    React.useEffect(() => {
        let isGood = true;
        GetUserGender().then((value) => { if(isGood) setGender(value); });
        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, []);

    const openPrevScreen = () => navigation.goBack();

    const openNextScreen = () => {
        if(gender == null) {
            AlertOK(ALERT_WARNING_TITLE, ALERT_GENDER_TEXT, null);
            return;
        }

        SetUserGender(gender).then(() => navigation.push('LandingMeasurementsScreen'));
    }

    return(
        <SafeAreaView style={stylesMisc.container}>
            <View style={stylesMisc.back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={stylesMisc.content}>
                <Text style={stylesLanding.question_gender}>What is your gender?</Text>

                <View style={stylesMisc.middle_button_container}>
                    <GroupButton 
                        is_selected={(gender == 1)? true : false}
                        title={'Male'}
                        pressHandler={() => setGender(1)}/>

                    <GroupButton 
                        is_selected={(gender == 0)? true : false}
                        title={'Female'}
                        pressHandler={() => setGender(0)}/>
                </View>
            </View>
        
            <ContinueButton pressHandler={openNextScreen}/>
        </SafeAreaView>
    );
};
