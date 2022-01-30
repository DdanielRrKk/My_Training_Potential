import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    DATABASE_STORE,
    USER_DATA_STORE,
    USER_WORKOUTS_STORE,
    USER_MEALS_STORE,
    USER_PREFERENCES_STORE,
    WORKOUT_PLANS_STORE,
    WORKOUT_DAYS_STORE,
    WORKOUT_EXERCISES_STORE,
    MEAL_MAIN_STORE,
    MEAL_SINGLES_STORE,
    LOG_STEPS_STORE,
    LOG_WEIGHT_STORE,
    LOG_MEALS_STORE,
    LOG_WORKOUTS_STORE
} from '../database_stores';
import {
    USER_DATA_SHEMA,
    USER_MEALS_SHEMA,
    USER_WORKOUTS_SHEMA,
    USER_PREFERENCES_SHEMA
} from '../database_shemas';


// create the database
export async function CreateDatabase(setReady) {
    try {
        await AsyncStorage.setItem(DATABASE_STORE, 'created');

        await AsyncStorage.setItem(USER_DATA_STORE, JSON.stringify(USER_DATA_SHEMA));
        await AsyncStorage.setItem(USER_MEALS_STORE, JSON.stringify(USER_MEALS_SHEMA));
        await AsyncStorage.setItem(USER_WORKOUTS_STORE, JSON.stringify(USER_WORKOUTS_SHEMA));
        await AsyncStorage.setItem(USER_PREFERENCES_STORE, JSON.stringify(USER_PREFERENCES_SHEMA));

        // await AsyncStorage.setItem(WORKOUT_PLANS_STORE, []);
        // await AsyncStorage.setItem(WORKOUT_DAYS_STORE, []);
        // await AsyncStorage.setItem(WORKOUT_EXERCISES_STORE, []);
        
        // await AsyncStorage.setItem(MEAL_MAIN_STORE, []);
        // await AsyncStorage.setItem(MEAL_SINGLES_STORE, []);
        
        // await AsyncStorage.setItem(LOG_STEPS_STORE, []);
        // await AsyncStorage.setItem(LOG_WEIGHT_STORE, []);
        // await AsyncStorage.setItem(LOG_MEALS_STORE, []);
        // await AsyncStorage.setItem(LOG_WORKOUTS_STORE, []);

        return setReady(true);
    } catch (error) {
        console.log(error);
    }
}



// check if the database exists
export async function ExistsDatabase(setExists) {
    try {
        await AsyncStorage.getItem(DATABASE_STORE, (err, result) => {
            if (result == null || result == '') return setExists(false);
            return setExists(true);
        });
    } catch (error) {
        console.log(error);
    }
}



// drop the database
export async function DropDatabase() {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.log(error);
    }
}