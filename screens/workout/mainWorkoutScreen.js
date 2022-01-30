import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';



export default function MainWorkoutScreen({ navigation }){
    
    return(
        <SafeAreaView style={styles.container}>
            <Text>Workout Screen</Text>
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
});