import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import { stylesMisc } from '../../styles/miscStyles';
import { stylesLanding } from '../../styles/landingStyles';

import ContinueButton from '../../components/misc/setup/continueButton';



export default function LandingScreen({ navigation }){
    const openNextScreen = () => navigation.push('LandingNameScreen');
 
    return(
        <SafeAreaView style={stylesMisc.container}>
            <View style={stylesMisc.content}>
                <Text style={stylesLanding.primary_title}>Welcome to</Text>
                <Text style={stylesLanding.secondary_title}>My Training Potential</Text>

                <Text style={stylesLanding.info}>While strength training, for example, you can do a higher number of reps with a lower weight. Increase the number of repetitions only after you’ve spent a few weeks mastering an exercise.</Text>
            </View>
        
            <ContinueButton pressHandler={openNextScreen}/>
        </SafeAreaView>
    );
};
