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

                <Text style={stylesLanding.info}>This is a pocket fitness app that helps you monitor your daily nutrition intake and training progress.</Text>
            </View>
        
            <ContinueButton pressHandler={openNextScreen}/>
        </SafeAreaView>
    );
};
