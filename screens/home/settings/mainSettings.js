import React from 'react';
import { Text, View, SafeAreaView, ScrollView, DeviceEventEmitter } from 'react-native';

import { GetAppFlagsData } from '../../../database/screen/app_serices';

import { CreateDatabase, ResetMealSetup, ResetWorkoutSetup } from '../../../database/general/general_services';

import { stylesMisc } from '../../../styles/miscStyles';

import BackButton from '../../../components/misc/backButton';
import SettingsOption from '../../../components/home/settings/settingsOption';

import { AlertOK, AlertYESNO } from '../../../helpers/alerts';



export default function MainSettingsScreen({ navigation }){
    const [isMealReady, setIsMealReady] = React.useState();
    const [isWorkoutReady, setIsWorkoutReady] = React.useState();

    React.useEffect(() => {
        let isGood = true;

        GetAppFlagsData().then(({isMealReady, isWorkoutReady}) => {
            if(isGood) {
                setIsMealReady(isMealReady);
                setIsWorkoutReady(isWorkoutReady);
            }
        });

        return () => {  
            isGood = false;
            DeviceEventEmitter.removeListener('event.userReady');
            DeviceEventEmitter.removeListener('event.mealReady');
            DeviceEventEmitter.removeListener('event.workoutReady');
            DeviceEventEmitter.removeListener('event.appState');
        } // to prevent memory leaks (clean up)
    }, [isMealReady, isWorkoutReady]);

    const warningTitle = "Warning !";
    const notSetupPlanText = "You have not setted a plan.";
    const resetSetupPlanText = "If you reset your plan setup, you will lose all of your data and progress. Do you want to continue ?";
    const deleteAccountText = "If you delete your account, you will lose all of your data and progress. Do you want to continue ?";

    const canceledEvent = () => console.log("canceled");

    const resetMealSetupHandler = () => ResetMealSetup(isWorkoutReady).then(() => {
        DeviceEventEmitter.emit("event.mealReady", {flag: false});
        navigation.goBack();
        console.log('deleted');
    });
    const resetWorkoutSetupHandler = () => ResetWorkoutSetup().then(() => {
        DeviceEventEmitter.emit("event.workoutReady", {flag: false});
        navigation.goBack();
        console.log('deleted');
    });
    const deleteAccountHandler = () => CreateDatabase().then(() => {
        DeviceEventEmitter.emit("event.userReady", {flag: false});
        DeviceEventEmitter.emit("event.mealReady", {flag: false});
        DeviceEventEmitter.emit("event.workoutReady", {flag: false});
        DeviceEventEmitter.emit("event.appState", {flag: true});
        console.log('deleted');
    });


    const openPrevScreen = () => navigation.goBack();

    const openEditUserDataScreen = () => navigation.navigate('EditUserDataScreen');
    const openEditMealDataScreen = () => {
        if(!isMealReady) { AlertOK(warningTitle, notSetupPlanText, canceledEvent); return; }
        navigation.navigate('EditMealDataScreen');
    }
    const openEditWorkoutDataScreen = () => {
        if(!isWorkoutReady) { AlertOK(warningTitle, notSetupPlanText, canceledEvent); return; }
        navigation.navigate('SetupWorkoutPlanScreen', {isFromEdit: true});
    }
    const resetMealSetup = () => {
        if(!isMealReady) { AlertOK(warningTitle, notSetupPlanText, canceledEvent); return; }
        AlertYESNO(warningTitle, resetSetupPlanText, canceledEvent, resetMealSetupHandler);
    }
    const resetWorkoutSetup = () => {
        if(!isWorkoutReady) { AlertOK(warningTitle, notSetupPlanText, canceledEvent); return; }
        AlertYESNO(warningTitle, resetSetupPlanText, canceledEvent, resetWorkoutSetupHandler);
    }
    const deleteAccount = () => AlertYESNO(warningTitle, deleteAccountText, canceledEvent, deleteAccountHandler);
 
    return(
        <SafeAreaView style={stylesMisc.container}>
            <ScrollView style={stylesMisc.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={stylesMisc.back_button_container}>
                    <BackButton pressHandler={openPrevScreen}/>
                </View>

                <View style={stylesMisc.content_start}>
                    <Text style={stylesMisc.subtitle}>Settings</Text>

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
