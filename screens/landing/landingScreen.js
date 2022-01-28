import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import ContinueButton from '../../components/landing/continueButton';



export default function LandingScreen({ navigation }){
    const openNextScreen = () => navigation.push('LandingNameScreen');
 
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.subtitle}>Welcome to</Text>
                <Text style={styles.title}>My Training Potential</Text>

                <Text style={styles.info}>While strength training, for example, you can do a higher number of reps with a lower weight. Increase the number of repetitions only after you’ve spent a few weeks mastering an exercise.</Text>
            </View>
        
            <View style={styles.button_container}>
                <ContinueButton pressHandler={openNextScreen}/>
            </View>
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

    subtitle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24
    },

    title: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 36
    },

    info: {
        textAlign: 'justify',
        marginTop: 50
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});