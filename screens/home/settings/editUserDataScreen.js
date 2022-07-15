import React from 'react';
import { Text , View, SafeAreaView } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { GetEditUserDataScreenData, SetEditUserData } from '../../../database/screen/home/settings_services';

import { stylesMisc } from '../../../styles/miscStyles';

import BackButton from '../../../components/misc/backButton';
import ActionButton from '../../../components/misc/actionButton';
import TextEntry from '../../../components/misc/textEntry';

import { IsInputTextValid, IsInputNumberValid } from '../../../helpers/validations';
import { AlertOK } from '../../../helpers/alerts';
import { 
    NAME_MAX_LENGTH, 
    AGE_MAX_LENGTH,
    HEIGHT_MAX_LENGTH,
    ALERT_WARNING_TITLE,
    ALERT_NAME_TEXT,
    ALERT_AGE_TEXT,
    ALERT_HEIGHT_TEXT
} from '../../../helpers/constants';



export default function EditUserDataScreen({ navigation }){
    const [name, setName] = React.useState(null);
    const [age, setAge] = React.useState(null);
    const [height, setHeight] = React.useState(null);

    const focus = useIsFocused();
    React.useEffect(() => {
        let isGood = true;

        GetEditUserDataScreenData().then(({ name, age, height }) => { 
            if(isGood) {
                setName(name);
                setAge(age); 
                setHeight(height);
            }
        });

        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, [focus]);

    const openPrevScreen = () => navigation.goBack();

    const saveEditData = () => SetEditUserData(name, age, height).then(() => {
        if(!IsInputTextValid(name)) {
            AlertOK(ALERT_WARNING_TITLE, ALERT_NAME_TEXT, null);
            return;
        }
        if(!IsInputNumberValid(age)) {
            AlertOK(ALERT_WARNING_TITLE, ALERT_AGE_TEXT, null);
            return;
        }
        if(!IsInputNumberValid(height)) {
            AlertOK(ALERT_WARNING_TITLE, ALERT_HEIGHT_TEXT, null);
            return;
        }

        navigation.setOptions({ tabBarVisible: true });
        navigation.navigate('TabNavigation');
    });

    return(
        <SafeAreaView style={stylesMisc.container}>
            <View style={stylesMisc.back_button_container}>
                <BackButton pressHandler={openPrevScreen}/>
            </View>

            <View style={stylesMisc.content_start}>
                <Text style={stylesMisc.subtitle}>Name</Text>

                <TextEntry
                    onChangeText={setName}
                    value={name}
                    maxLength={NAME_MAX_LENGTH}/>

                <Text style={stylesMisc.subtitle}>Age</Text>

                <TextEntry
                    onChangeText={setAge}
                    value={age}
                    maxLength={AGE_MAX_LENGTH}
                    isNumeric={true}/>

                <Text style={stylesMisc.subtitle}>Height</Text>

                <TextEntry
                    onChangeText={setHeight}
                    value={height}
                    maxLength={HEIGHT_MAX_LENGTH}
                    isNumeric={true}/>
                    
            </View>

            <ActionButton title='Save' pressHandler={saveEditData}/>
        </SafeAreaView>
    );
};
