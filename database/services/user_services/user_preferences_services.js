import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_PREFERENCES_STORE } from "../../database_stores";
import { USER_PREFERENCES_SCHEMA } from '../../database_shemas';



async function setUserPreferenceParameter(param_number, parameter) {
    try {
        if(param_number == 0) { // add new user preference
            await AsyncStorage.setItem(USER_PREFERENCES_STORE, JSON.stringify(parameter));
            return;
        }

        await AsyncStorage.getItem(USER_PREFERENCES_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const user = JSON.parse(result);
            switch(param_number) {
                case 1: user.current_workout_plan_key = parameter; break; // add / update current user workout plan
                case 2: user.current_meals_log_key = parameter; break; // add / update current user meal
                case 3: user.is_user_data_ready = parameter; break; // add / update user ready data
                default: break;
            }
            await AsyncStorage.setItem(USER_PREFERENCES_STORE, JSON.stringify(user));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

async function getUserPreferenceParameter(param_number, setParameter) {
    try {
        await AsyncStorage.getItem(USER_PREFERENCES_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const user = JSON.parse(result);
            switch(param_number) {
                case 0: setParameter(user); break; // get user preference
                case 1: setParameter(user.current_workout_plan_key); break; // get current user workout plan
                case 2: setParameter(user.current_meals_log_key); break; // get current user meal
                case 3: setParameter(user.is_user_data_ready); break; // get user ready data
                default: break;
            }
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// delete =====
export async function DeleteUserPreference() {
    await AsyncStorage.setItem(USER_PREFERENCES_STORE, JSON.stringify(USER_PREFERENCES_SCHEMA));
}



// set user preference =====
export async function SetUserPreference( current_workout_plan_key, current_meals_log_key, is_user_data_ready ) {
    setUserPreferenceParameter(0, {
        current_workout_plan_key: current_workout_plan_key,
        current_meals_log_key: current_meals_log_key,
        is_user_data_ready: is_user_data_ready
    });
}
// set current user workout key
export async function SetUserPreferenceCurrentWorkoutPlanKey(current_workout_plan_key) {
    return setUserPreferenceParameter(1, current_workout_plan_key);
}
// set current user meal
export async function SetUserPreferenceCurrentMealLogKey(current_meals_log_key) {
    return setUserPreferenceParameter(2, current_meals_log_key);
}
// set user ready data
export async function SetUserPreferenceIsUserDataReady(is_user_data_ready) {
    return setUserPreferenceParameter(3, is_user_data_ready);
}



// get user preference =====
export async function GetUserPreference(setUserPreference) {
    return getUserPreferenceParameter(0, setUserPreference);
}
// get current user workout key
export async function GetUserPreferenceCurrentWorkoutPlanKey(setCurrentWorkoutPlanKey) {
    return getUserPreferenceParameter(1, setCurrentWorkoutPlanKey);
}
// get current user meal
export async function GetUserPreferenceCurrentMealLogKey(setCurrentMealLogKey) {
    return getUserPreferenceParameter(2, setCurrentMealLogKey);
}
// get user ready data
export async function GetUserPreferenceIsUserDataReady(setIsUserDataReady) {
    return getUserPreferenceParameter(3, setIsUserDataReady);
}