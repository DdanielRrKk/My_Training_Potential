import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, KeyboardAvoidingView } from 'react-native';

import ContinueButton from '../../components/landing/continueButton';
import BackButton from '../../components/landing/backButton';
import GroupButton from '../../components/landing/groupButton';


const AGE_MAX_LENGTH = 3;
const WEIGHT_MAX_LENGTH = 3;
const HEIGHT_MAX_LENGTH = 3;

export default function LandingMeasurementsScreen({ navigation }){
    const [preference, setPreference] = React.useState(null);
    const [age, setAge] = React.useState(null);
    const [weight, setWeight] = React.useState(null);
    const [height, setHeight] = React.useState(null);

    
    const changePreference = (value) => setPreference(value);
    const changeAge = (value) => setAge(value);
    const changeWeight = (value) => setWeight(value);
    const changeHeight = (value) => setHeight(value);

    const openNextScreen = () => console.log('next');
    const openPrevScreen = () => navigation.goBack();
 
    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView>
                <View style={styles.top_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={styles.content}>
                    <Text style={styles.question}>Age</Text>
                    <TextInput
                        style={styles.entry}
                        onChangeText={changeAge}
                        keyboardType='numeric'
                        maxLength={AGE_MAX_LENGTH}/>

                    <Text style={[styles.question, {marginTop: 32}]}>Weight</Text>
                    <TextInput
                        style={styles.entry}
                        placeholder='kg'
                        onChangeText={changeWeight}
                        keyboardType='numeric'
                        maxLength={WEIGHT_MAX_LENGTH}/>

                    <Text style={[styles.question, {marginTop: 32}]}>Height</Text>
                    <TextInput
                        style={styles.entry}
                        placeholder='cm'
                        onChangeText={changeHeight}
                        keyboardType='numeric'
                        maxLength={HEIGHT_MAX_LENGTH}/>
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
        fontSize: 18,
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

    middle_button_container: {
        width: '100%',
        marginTop: 32,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    
    entry:{
        width: '50%',
        marginTop: 16,
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        justifyContent: 'center',
    },
});