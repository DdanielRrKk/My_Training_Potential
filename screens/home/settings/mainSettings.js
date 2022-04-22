import React from 'react';
import { Text, View, SafeAreaView, ScrollView, DeviceEventEmitter } from 'react-native';

import { GetAppState } from '../../../database/screen/app_serices';

import { CreateDatabase, ResetMealSetup, ResetWorkoutSetup } from '../../../database/general/general_services';

import { stylesMisc } from '../../../styles/miscStyles';

import BackButton from '../../../components/misc/backButton';
import SettingsOption from '../../../components/home/settings/settingsOption';

import { AlertOK, AlertYESNO } from '../../../helpers/alerts';
import { 
    SYSTEM_USER_AND_MEAL_SETUP,
    SYSTEM_USER_AND_WORKOUT_SETUP,
    SYSTEM_ALL_SETUP,

    ALERT_WARNING_TITLE,
    ALERT_NOT_SETUP_PLAN_TEXT,
    ALERT_RESET_SETUP_PLAN_TEXT,
    ALERT_DELETE_ACCOUNT_TEXT
} from '../../../helpers/constants';



export default function MainSettingsScreen({ navigation }){
    const [systemState, setSystemState] = React.useState(null);
    
    const [isMealSetup, setIsMealSetup] = React.useState(false);
    const [isWorkoutSetup, setIsWorkoutSetup] = React.useState(false);

    React.useEffect(() => {
        let isGood = true;

        GetAppState().then((state) => { 
            if(isGood) {
                setSystemState(state);
                setIsMealSetup((systemState == SYSTEM_USER_AND_MEAL_SETUP || systemState == SYSTEM_ALL_SETUP) ? true : false);
                setIsWorkoutSetup((systemState == SYSTEM_USER_AND_WORKOUT_SETUP || systemState == SYSTEM_ALL_SETUP) ? true : false);
            }
         });

        return () => {  
            isGood = false;
            DeviceEventEmitter.removeListener('event.appUpdate');
            DeviceEventEmitter.removeListener('event.stateUpdate');
        } // to prevent memory leaks (clean up)
    }, [systemState]);

    console.log('systemState settings', systemState);
    console.log('isMealSetup settings', isMealSetup);
    console.log('isWorkoutSetup settings', isWorkoutSetup);
    
    const canceledEvent = () => console.log("canceled");

    const resetMealSetupHandler = () => ResetMealSetup(isWorkoutSetup).then(() => {
        DeviceEventEmitter.emit("event.stateUpdate", {flag: true});
        navigation.goBack();
    });
    const resetWorkoutSetupHandler = () => ResetWorkoutSetup().then(() => {
        DeviceEventEmitter.emit("event.stateUpdate", {flag: true});
        navigation.goBack();
    });
    const deleteAccountHandler = () => CreateDatabase().then(() => {
        DeviceEventEmitter.emit("event.stateUpdate", {flag: true});
        DeviceEventEmitter.emit("event.appState", {flag: true});
    });


    const openPrevScreen = () => navigation.goBack();

    const openEditUserDataScreen = () => navigation.navigate('EditUserDataScreen');
    const openEditMealDataScreen = () => {
        if(!isMealSetup) { AlertOK(ALERT_WARNING_TITLE, ALERT_NOT_SETUP_PLAN_TEXT, canceledEvent); return; }
        navigation.navigate('EditMealDataScreen');
    }
    const openEditWorkoutDataScreen = () => {
        if(!isWorkoutSetup) { AlertOK(ALERT_WARNING_TITLE, ALERT_NOT_SETUP_PLAN_TEXT, canceledEvent); return; }
        navigation.navigate('SetupWorkoutPlanScreen', {isFromEdit: true});
    }
    const resetMealSetup = () => {
        if(!isMealSetup) { AlertOK(ALERT_WARNING_TITLE, ALERT_NOT_SETUP_PLAN_TEXT, canceledEvent); return; }
        AlertYESNO(ALERT_WARNING_TITLE, ALERT_RESET_SETUP_PLAN_TEXT, canceledEvent, resetMealSetupHandler);
    }
    const resetWorkoutSetup = () => {
        if(!isWorkoutSetup) { AlertOK(ALERT_WARNING_TITLE, ALERT_NOT_SETUP_PLAN_TEXT, canceledEvent); return; }
        AlertYESNO(ALERT_WARNING_TITLE, ALERT_RESET_SETUP_PLAN_TEXT, canceledEvent, resetWorkoutSetupHandler);
    }
    const deleteAccount = () => AlertYESNO(ALERT_WARNING_TITLE, ALERT_DELETE_ACCOUNT_TEXT, canceledEvent, deleteAccountHandler);
 
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
