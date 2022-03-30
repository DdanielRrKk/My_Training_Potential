import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput } from 'react-native';

import { SetUserName, GetUserName } from '../../database/screen/landing_services';

import { continue_button_container } from '../../styles/setupStyles';
import { container, content, back_button_container } from '../../styles/miscStyles';

import ContinueButton from '../../components/misc/setup/continueButton';
import BackButton from '../../components/misc/backButton';

import { NAME_MAX_LENGTH } from '../../helpers/constants';



export default function LandingNameScreen({ navigation }){
    const [name, setName] = React.useState(null);

    React.useEffect(() => {
        let isGood = true;
        GetUserName().then((value) => { if(isGood) setName(value); });
        return () => {  isGood = false; } // to prevent memory leaks (clean up)
    }, []);

    const openPrevScreen = () => navigation.goBack();

    const openNextScreen = () => {
        SetUserName(name);
        navigation.push('LandingGenderScreen');
    }
    
    return(
        <SafeAreaView style={container}>
            <KeyboardAvoidingView>
                <View style={back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={content}>
                    <Text style={styles.question}>What is your name?</Text>

                    <TextInput
                        style={styles.entry}
                        onChangeText={setName}
                        value={name}
                        maxLength={NAME_MAX_LENGTH}/>
                </View>
            
                <View style={continue_button_container}>
                    <ContinueButton pressHandler={openNextScreen}/>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({

    question: {
        fontSize: 18
    },

    entry:{
        width: '100%',
        marginTop: 32,
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        justifyContent: 'center',
    },
});