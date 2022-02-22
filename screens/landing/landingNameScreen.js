import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, StatusBar } from 'react-native';

import { 
    SetUserDataName,
    GetUserDataName
} from '../../database/services/user_services/user_data_services';

import { bottom_button_container } from '../../styles/landingStyles';
import { container, content } from '../../styles/miscStyles';

import ContinueButton from '../../components/landing/continueButton';
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
                <View style={styles.top_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={content}>
                    <Text style={styles.question}>What is your name?</Text>

                    <TextInput
                        style={styles.entry}
                        onChangeText={setName}
                        maxLength={NAME_MAX_LENGTH}/>
                </View>
            
                <View style={bottom_button_container}>
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

    top_button_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start'
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