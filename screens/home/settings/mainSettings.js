import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

import { CreateDatabase, ResetMealSetup, ResetWorkoutSetup } from '../../../database/general/general_services';

import { container, back_button_container, shadow, subtitle } from '../../../styles/miscStyles';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../styles/colors';

import BackButton from '../../../components/misc/backButton';

import { useSystemFlagsGlobal, useAppStateGlobal } from '../../../helpers/globalState';
import { AlertOK, AlertYESNO } from '../../../helpers/alerts';



export default function MainSettingsScreen({ navigation }){
    const [systemFlags, setSystemFlags] = useSystemFlagsGlobal();
    const [appState, setAppState] = useAppStateGlobal();



    const warningTitle = "Warning !";
    const notSetupPlanText = "You have not setted a plan.";
    const resetSetupPlanText = "If you reset your plan setup, you will lose all of your data and progress. Do you want to continue ?";
    const deleteAccountText = "If you delete your account, you will lose all of your data and progress. Do you want to continue ?";
    const canceledEvent = () => console.log("canceled");
    const resetMealSetupHandler = () => {
        setSystemFlags({...systemFlags, isMealReady: false});
        ResetMealSetup(systemFlags.isWorkoutReady);
        navigation.goBack();
        console.log('deleted');
    }
    const resetWorkoutSetupHandler = () => {
        setSystemFlags({...systemFlags, isWorkoutReady: false});
        ResetWorkoutSetup();
        navigation.goBack();
        console.log('deleted');
    }
    const deleteAccountHandler = () => {
        setSystemFlags({
            isUserReady: false,
            isMealReady: false,
            isWorkoutReady: false
        });
        CreateDatabase();
        setAppState(false);
        console.log('deleted');
    }



    const openPrevScreen = () => navigation.goBack();

    
    const openEditUserDataScreen = () => navigation.navigate('EditUserDataScreen');
    const openEditMealDataScreen = () => {
        if(!systemFlags.isMealReady) {
            AlertOK(warningTitle, notSetupPlanText, canceledEvent);
            return;
        }
        navigation.navigate('EditMealDataScreen');
    }
    const openEditWorkoutDataScreen = () => {
        if(!systemFlags.isWorkoutReady) {
            AlertOK(warningTitle, notSetupPlanText, canceledEvent);
            return;
        }
        navigation.navigate('SetupWorkoutPlanScreen', {isFromEdit: true});
    }
    const resetMealSetup = () => {
        if(!systemFlags.isMealReady) {
            AlertOK(warningTitle, notSetupPlanText, canceledEvent);
            return;
        }
        AlertYESNO(warningTitle, resetSetupPlanText, canceledEvent, resetMealSetupHandler);
    }
    const resetWorkoutSetup = () => {
        if(!systemFlags.isWorkoutReady) {
            AlertOK(warningTitle, notSetupPlanText, canceledEvent);
            return;
        }
        AlertYESNO(warningTitle, resetSetupPlanText, canceledEvent, resetWorkoutSetupHandler);
    }
    const deleteAccount = () => AlertYESNO(warningTitle, deleteAccountText, canceledEvent, deleteAccountHandler);
 
    return(
        <SafeAreaView style={container}>
            <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
                <View style={back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={styles.content}>
                    <Text style={subtitle}>Settings</Text>

                    <TouchableOpacity
                        style={[styles.box, shadow]}
                        onPress={openEditUserDataScreen}>
                        <Text style={styles.labels}>Edit User Data</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.box, shadow]}
                        onPress={openEditMealDataScreen}>
                        <Text style={styles.labels}>Edit Nutritions Data</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.box, shadow]}
                        onPress={openEditWorkoutDataScreen}>
                        <Text style={styles.labels}>Edit Workout Plan</Text>
                    </TouchableOpacity>
                    

                    <TouchableOpacity
                        style={styles.textBox}
                        onPress={resetMealSetup}>
                        <Text style={styles.labelsImportant}>Reset Meal Setup</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.textBox}
                        onPress={resetWorkoutSetup}>
                        <Text style={styles.labelsImportant}>Reset Workout Setup</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.textBox}
                        onPress={deleteAccount}>
                        <Text style={styles.labelsImportant}>Delete Account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
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
        backgroundColor: PRIMARY_COLOR,
        marginBottom: 16
    },

    labels: {
        fontSize: 16,
        fontWeight: 'bold',
        color: SECONDARY_COLOR
    },
    labelsImportant: {
        fontSize: 16,
        color: 'red'
    },

    textBox: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 16,
        padding: 16
    }
});