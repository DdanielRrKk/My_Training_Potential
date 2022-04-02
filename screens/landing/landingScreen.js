import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import { container, content } from '../../styles/miscStyles';
import { TERTIARY_COLOR } from '../../styles/colors';

import ContinueButton from '../../components/misc/setup/continueButton';



export default function LandingScreen({ navigation }){
    const openNextScreen = () => navigation.push('LandingNameScreen');
 
    return(
        <SafeAreaView style={container}>
            <View style={content}>
                <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 24, color: TERTIARY_COLOR }}>Welcome to</Text>
                <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 36, color: TERTIARY_COLOR }}>My Training Potential</Text>

                <Text style={{ textAlign: 'justify', marginTop: 50, color: TERTIARY_COLOR }}>While strength training, for example, you can do a higher number of reps with a lower weight. Increase the number of repetitions only after you’ve spent a few weeks mastering an exercise.</Text>
            </View>
        
            <ContinueButton pressHandler={openNextScreen}/>
        </SafeAreaView>
    );
};
