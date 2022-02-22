import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, StatusBar } from 'react-native';

import { 
    SetUserDataName,
    GetUserDataName
} from '../../database/services/user_services/user_data_services';

import { continue_button_container } from '../../styles/setupStyles';
import { container, content, back_button_container } from '../../styles/miscStyles';

import ContinueButton from '../../components/misc/setup/continueButton';
import BackButton from '../../components/misc/backButton';



const NAME_MAX_LENGTH = 40;

export default function LandingNameScreen({ navigation }){
    const [name, setName] = React.useState(null);

    React.useEffect(() => {
        GetUserDataName(setName);
    }, []);

    const openPrevScreen = () => navigation.goBack();

    const openNextScreen = () => {
        SetUserDataName(name);
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