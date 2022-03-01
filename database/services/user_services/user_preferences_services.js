import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_PREFERENCES_STORE } from "../../database_stores";
import { USER_PREFERENCES_SCHEMA } from '../../database_shemas';



async function setUserPreferenceParameter(param_number, parameter) {
    try {
        const result = await AsyncStorage.getItem(USER_PREFERENCES_STORE);
        if(result == null || result == '') return console.log('object has no data');

        if(param_number == 0) {
            await AsyncStorage.setItem(USER_PREFERENCES_STORE, JSON.stringify(parameter));
            return;
        }

        const user = JSON.parse(result);
        switch(param_number) {
            case 1: user.is_workout_ready = parameter; break; 
            case 2: user.is_meal_ready = parameter; break; 
            case 3: user.is_user_data_ready = parameter; break;
            default: break;
        }
        await AsyncStorage.setItem(USER_PREFERENCES_STORE, JSON.stringify(user));
        return;
    } catch (error) {
        console.log(error);
    }
}

async function getUserPreferenceParameter(param_number) {
    try {
        const result = await AsyncStorage.getItem(USER_PREFERENCES_STORE);
        if(result == null || result == '') return console.log('object has no data');

        const user = JSON.parse(result);
        if(param_number == 0) return user;
        if(param_number == 1) return user.is_workout_ready;
        if(param_number == 2) return user.is_meal_ready;
        if(param_number == 3) return user.is_user_data_ready;
        return console.log('not found');
    } catch (error) {
        console.log(error);
    }
}



// delete =====
export async function DeleteUserPreference() {
    await AsyncStorage.setItem(USER_PREFERENCES_STORE, JSON.stringify(USER_PREFERENCES_SCHEMA));
}



// set user preference =====
export async function SetUserPreference( is_workout_ready, is_meal_ready, is_user_data_ready ) {
    setUserPreferenceParameter(0, {
        is_workout_ready: is_workout_ready,
        is_meal_ready: is_meal_ready,
        is_user_data_ready: is_user_data_ready
    });
}
export async function SetUserPreferenceIsWorkoutReady(is_workout_ready) {
    return setUserPreferenceParameter(1, is_workout_ready);
}
export async function SetUserPreferenceIsMealReady(is_meal_ready) {
    return setUserPreferenceParameter(2, is_meal_ready);
}
export async function SetUserPreferenceIsUserDataReady(is_user_data_ready) {
    return setUserPreferenceParameter(3, is_user_data_ready);
}



// get user preference =====
export async function GetUserPreference() {
    return getUserPreferenceParameter(0);
}
export async function GetUserPreferenceIsWorkoutReady() {
    return getUserPreferenceParameter(1);
}
export async function GetUserPreferenceIsMealReady() {
    return getUserPreferenceParameter(2);
}
export async function GetUserPreferenceIsUserDataReady() {
    return getUserPreferenceParameter(3);
}
