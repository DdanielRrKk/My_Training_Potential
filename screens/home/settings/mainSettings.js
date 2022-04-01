import React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';

import { CreateDatabase, ResetMealSetup, ResetWorkoutSetup } from '../../../database/general/general_services';

import { container, back_button_container, subtitle, content_start } from '../../../styles/miscStyles';

import BackButton from '../../../components/misc/backButton';
import SettingsOption from '../../../components/home/settings/settingsOption';

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

                <View style={content_start}>
                    <Text style={subtitle}>Settings</Text>

                    <SettingsOption 
                        title='Edit User Data'
                        pressHandler={openEditUserDataScreen}/>
                        
                    <SettingsOption 
                        title=' Edit Nutritions Data'
                        pressHandler={openEditMealDataScreen}/>
                        
                    <SettingsOption 
                        title='Edit Workout Plan'
                        pressHandler={openEditWorkoutDataScreen}/>
                    
                    
                    <SettingsOption 
                        title='Reset Meal Setup'
                        pressHandler={resetMealSetup}
                        isImportant={true}/>
                        
                    <SettingsOption 
                        title='Reset Workout Setup'
                        pressHandler={resetWorkoutSetup}
                        isImportant={true}/>
                        
                    <SettingsOption 
                        title='Delete Account'
                        pressHandler={deleteAccount}
                        isImportant={true}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
