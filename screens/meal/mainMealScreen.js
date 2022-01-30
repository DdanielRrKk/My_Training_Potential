import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';



export default function MainMealScreen({ navigation }){
    
    return(
        <SafeAreaView style={styles.container}>
            <Text>Meal Screen</Text>
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