import React from 'react';
import { Text, View, SafeAreaView, KeyboardAvoidingView } from 'react-native';

import { SetUserName, GetUserName } from '../../database/screen/landing_services';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesLanding } from '../../styles/landingStyles';

import ContinueButton from '../../components/misc/setup/continueButton';
import BackButton from '../../components/misc/backButton';
import TextEntry from '../../components/misc/textEntry';

import { IsInputTextValid } from '../../helpers/validations';
import { AlertOK } from '../../helpers/alerts';
import { 
    NAME_MAX_LENGTH,
    ALERT_WARNING_TITLE,
    ALERT_NAME_TEXT
} from '../../helpers/constants';



export default function LandingNameScreen({ navigation }){
    const [name, setName] = React.useState(null);

    React.useEffect(() => {
        let isGood = true;
        GetUserName().then((value) => { if(isGood) setName(value); });
        return () => { isGood = false; } // to prevent memory leaks (clean up)
    }, []);

    const openPrevScreen = () => navigation.goBack();
    
    const openNextScreen = () => {
        if(!IsInputTextValid(name)) {
            AlertOK(ALERT_WARNING_TITLE, ALERT_NAME_TEXT, null);
            return;
        }

        SetUserName(name).then(() => navigation.push('LandingGenderScreen'));
    }
    
    return(
        <SafeAreaView style={stylesMisc.container}>
            <KeyboardAvoidingView>
                <View style={stylesMisc.back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={stylesLanding.content}>
                    <Text style={stylesLanding.question}>What is your name?</Text>

                    <TextEntry 
                        onChangeText={setName}
                        value={name}
                        maxLength={NAME_MAX_LENGTH}/>
                </View>
            
                <ContinueButton pressHandler={openNextScreen}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
