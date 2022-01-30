import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';



export default function MainLearnScreen({ navigation }){
    
    return(
        <SafeAreaView style={styles.container}>
            <Text>Learn Screen</Text>
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