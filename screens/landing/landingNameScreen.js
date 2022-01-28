import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput } from 'react-native';

import ContinueButton from '../../components/landing/continueButton';
import BackButton from '../../components/landing/backButton';



const NAME_MAX_LENGTH = 40;

export default function LandingNameScreen({ navigation }){
    const [name, setName] = React.useState(null);
    const changeNameHandler = (value) => setName(value);

    const openNextScreen = () => navigation.push('LandingGenderScreen');
    const openPrevScreen = () => navigation.goBack();
 
    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView>
                <View style={styles.top_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={styles.content}>
                    <Text style={styles.question}>What is your name?</Text>

                    <TextInput
                        style={styles.entry}
                        onChangeText={changeNameHandler}
                        maxLength={NAME_MAX_LENGTH}/>
                </View>
            
                <View style={styles.bottom_button_container}>
                    <ContinueButton pressHandler={openNextScreen}/>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    question: {
        fontSize: 18
    },

    top_button_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    bottom_button_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
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