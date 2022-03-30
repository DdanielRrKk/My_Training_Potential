import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';

import { CreateDatabase, ResetMealSetup, ResetWorkoutSetup } from '../../../database/general/general_services';

import { container, back_button_container } from '../../../styles/miscStyles';

import BackButton from '../../../components/misc/backButton';

import { useSystemFlagsGlobal, useAppStateGlobal } from '../../../helpers/globalState';



export default function MainSettingsScreen({ navigation }){
    const [systemFlags, setSystemFlags] = useSystemFlagsGlobal();
    const [appState, setAppState] = useAppStateGlobal();

    const openPrevScreen = () => navigation.goBack();

    const openEditUserDataScreen = () => navigation.navigate('EditUserDataScreen');
    const openEditMealDataScreen = () => {
        if(!systemFlags.isMealReady) {
            Alert.alert(
                "Warning !",
                "You have not set a Meal plan.",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("canceled"),
                        style: "cancel"
                    }
                ]
            );
            return;
        }

        navigation.navigate('EditMealDataScreen');
    }
    const openEditWorkoutDataScreen = () => {
        if(!systemFlags.isWorkoutReady) {
            Alert.alert(
                "Warning !",
                "You have not set a Workout plan.",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("canceled"),
                        style: "cancel"
                    }
                ]
            );
            return;
        }

        navigation.navigate('SetupWorkoutPlanScreen', {isFromEdit: true});
    }

    const resetMealSetup = () => {
        if(!systemFlags.isMealReady) {
            Alert.alert(
                "Warning !",
                "You have not set a Meal plan.",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("canceled"),
                        style: "cancel"
                    }
                ]
            );
            return;
        }
        Alert.alert(
            "Warning !",
            "If you reset your meal setup, you will lose all of your data and progress. Do you want to continue ?",
            [
                {
                    text: "No",
                    onPress: () => console.log("canceled"),
                    style: "cancel"
                },
                { 
                  text: "Yes", 
                  onPress: () => {
                    setSystemFlags({...systemFlags, isMealReady: false});
                    ResetMealSetup(systemFlags.isWorkoutReady);
                    navigation.goBack();
                    console.log('deleted');
                  }
                }
            ]
        );
    }
    const resetWorkoutSetup = () => {
        if(!systemFlags.isWorkoutReady) {
            Alert.alert(
                "Warning !",
                "You have not set a Workout plan.",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("canceled"),
                        style: "cancel"
                    }
                ]
            );
            return;
        }
        Alert.alert(
            "Warning !",
            "If you reset your workout setup, you will lose all of your data and progress. Do you want to continue ?",
            [
                {
                    text: "No",
                    onPress: () => console.log("canceled"),
                    style: "cancel"
                },
                { 
                  text: "Yes", 
                  onPress: () => {
                    setSystemFlags({...systemFlags, isWorkoutReady: false});
                    ResetWorkoutSetup();
                    navigation.goBack();
                    console.log('deleted');
                  }
                }
            ]
        );
    }
    const deleteAccount = () => {
        Alert.alert(
            "Warning !",
            "If you delete your account, you will lose all of your data and progress. Do you want to continue ?",
            [
                {
                    text: "No",
                    onPress: () => console.log("canceled"),
                    style: "cancel"
                },
                { 
                  text: "Yes", 
                  onPress: () => {
                    setSystemFlags({
                        isUserReady: false,
                        isMealReady: false,
                        isWorkoutReady: false
                    });
                    CreateDatabase();
                    setAppState(false);
                    console.log('deleted');
                  }
                }
            ]
        );
    }
 
    return(
        <SafeAreaView style={container}>
            <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
                <View style={back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={styles.content}>
                    <Text style={styles.subtitle}>Settings</Text>

                    <TouchableOpacity
                        style={styles.box}
                        onPress={openEditUserDataScreen}>
                        <Text style={{fontSize: 16}}>Edit User Data</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.box}
                        onPress={openEditMealDataScreen}>
                        <Text style={{fontSize: 16}}>Edit Nutritions Data</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.box}
                        onPress={openEditWorkoutDataScreen}>
                        <Text style={{fontSize: 16}}>Edit Workout Plan</Text>
                    </TouchableOpacity>
                    

                    <TouchableOpacity
                        style={styles.textBox}
                        onPress={resetMealSetup}>
                        <Text style={{fontSize: 16, color: 'red'}}>Reset Meal Setup</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.textBox}
                        onPress={resetWorkoutSetup}>
                        <Text style={{fontSize: 16, color: 'red'}}>Reset Workout Setup</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.textBox}
                        onPress={deleteAccount}>
                        <Text style={{fontSize: 16, color: 'red'}}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    subtitle: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        fontSize: 18,
        paddingVertical: 16
    },

    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    box: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 16,
        borderRadius: 10,
        backgroundColor: 'gray',
        marginBottom: 16
    },

    textBox: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 16,
        padding: 16
    }
});