import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    DATABASE_STORE,
    USER_DATA_STORE,
    USER_WORKOUTS_STORE,
    USER_MEALS_STORE,
    USER_PREFERENCES_STORE,
    MEAL_BREAKFAST_STORE,
    MEAL_DINNER_STORE,
    MEAL_LUNCH_STORE,
    MEAL_WATER_STORE,
    MEAL_CURRENT_DATA_STORE,
    LOG_STEPS_STORE,
    LOG_WEIGHT_STORE,
    LOG_MEALS_STORE,
    LOG_WORKOUTS_STORE,
    WORKOUT_KEY_STORE,

    SYSTEM_IS_WORKOUT_SETUP,
    SYSTEM_IS_MEAL_SETUP,
    SYSTEM_IS_USER_SETUP,
    USER_NAME,
    USER_AGE,
    USER_WEIGHT,
    USER_HEIGHT,
    USER_GENDER,
    USER_MEAL_GOAL,
    USER_ACTIVITY_LEVEL,
    USER_CALORIES_GOAL,
    USER_CARBS_GOAL,
    USER_PROTEIN_GOAL,
    USER_FAT_GOAL,
    MEAL_WATER,
    MEAL_BREAKFAST_RECOMMENDED_MIN,
    MEAL_BREAKFAST_RECOMMENDED_MAX,
    MEAL_BREAKFAST_TOTAL_CALORIES,
    MEAL_BREAKFAST_TOTAL_CARBS,
    MEAL_BREAKFAST_TOTAL_PROTEIN,
    MEAL_BREAKFAST_TOTAL_FAT,
    MEAL_BREAKFAST_FOODS,
    MEAL_LUNCH_RECOMMENDED_MIN,
    MEAL_LUNCH_RECOMMENDED_MAX,
    MEAL_LUNCH_TOTAL_CALORIES,
    MEAL_LUNCH_TOTAL_CARBS,
    MEAL_LUNCH_TOTAL_PROTEIN,
    MEAL_LUNCH_TOTAL_FAT,
    MEAL_LUNCH_FOODS,
    MEAL_DINNER_RECOMMENDED_MIN,
    MEAL_DINNER_RECOMMENDED_MAX,
    MEAL_DINNER_TOTAL_CALORIES,
    MEAL_DINNER_TOTAL_CARBS,
    MEAL_DINNER_TOTAL_PROTEIN,
    MEAL_DINNER_TOTAL_FAT,
    MEAL_DINNER_FOODS
} from '../database_stores';
import {
    USER_DATA_SCHEMA,
    USER_MEALS_SCHEMA,
    USER_WORKOUTS_SCHEMA,
    USER_PREFERENCES_SCHEMA,
    MEAL_MAIN_SCHEMA,
    MEAL_WATER_SCHEMA,
    MEAL_CURRENT_DATA_SCHEMA,
    LOG_SCHEMA,
    WORKOUT_SCHEMA
} from '../database_shemas';



const CREATED_DATABASE_MESSAGE = 'created';

// create the database
export async function CreateDatabase() {
    try {
        await AsyncStorage.setItem(DATABASE_STORE, CREATED_DATABASE_MESSAGE);

        await AsyncStorage.setItem(USER_DATA_STORE, JSON.stringify(USER_DATA_SCHEMA));
        await AsyncStorage.setItem(USER_MEALS_STORE, JSON.stringify(USER_MEALS_SCHEMA));
        await AsyncStorage.setItem(USER_WORKOUTS_STORE, JSON.stringify(USER_WORKOUTS_SCHEMA));
        await AsyncStorage.setItem(USER_PREFERENCES_STORE, JSON.stringify(USER_PREFERENCES_SCHEMA));


        await AsyncStorage.setItem(MEAL_BREAKFAST_STORE, JSON.stringify(MEAL_MAIN_SCHEMA));
        await AsyncStorage.setItem(MEAL_DINNER_STORE, JSON.stringify(MEAL_MAIN_SCHEMA));
        await AsyncStorage.setItem(MEAL_LUNCH_STORE, JSON.stringify(MEAL_MAIN_SCHEMA));
        await AsyncStorage.setItem(MEAL_WATER_STORE, JSON.stringify(MEAL_WATER_SCHEMA));
        await AsyncStorage.setItem(MEAL_CURRENT_DATA_STORE, JSON.stringify(MEAL_CURRENT_DATA_SCHEMA));


        await AsyncStorage.setItem(LOG_STEPS_STORE, JSON.stringify(LOG_SCHEMA));
        await AsyncStorage.setItem(LOG_WEIGHT_STORE, JSON.stringify(LOG_SCHEMA));
        await AsyncStorage.setItem(LOG_MEALS_STORE, JSON.stringify(LOG_SCHEMA));
        await AsyncStorage.setItem(LOG_WORKOUTS_STORE, JSON.stringify(LOG_SCHEMA));
        
        await AsyncStorage.setItem(WORKOUT_KEY_STORE, JSON.stringify(WORKOUT_SCHEMA));


        // === test ===
        await AsyncStorage.setItem(SYSTEM_IS_WORKOUT_SETUP, JSON.stringify(false));
        await AsyncStorage.setItem(SYSTEM_IS_MEAL_SETUP, JSON.stringify(false));
        await AsyncStorage.setItem(SYSTEM_IS_USER_SETUP, JSON.stringify(false));
        
        await AsyncStorage.setItem(USER_NAME, JSON.stringify(null));
        await AsyncStorage.setItem(USER_AGE, JSON.stringify(null));
        await AsyncStorage.setItem(USER_WEIGHT, JSON.stringify(null));
        await AsyncStorage.setItem(USER_HEIGHT, JSON.stringify(null));
        await AsyncStorage.setItem(USER_GENDER, JSON.stringify(null));
        
        await AsyncStorage.setItem(USER_MEAL_GOAL, JSON.stringify(null));
        await AsyncStorage.setItem(USER_ACTIVITY_LEVEL, JSON.stringify(null));
        await AsyncStorage.setItem(USER_CALORIES_GOAL, JSON.stringify(null));
        await AsyncStorage.setItem(USER_CARBS_GOAL, JSON.stringify(null));
        await AsyncStorage.setItem(USER_PROTEIN_GOAL, JSON.stringify(null));
        await AsyncStorage.setItem(USER_FAT_GOAL, JSON.stringify(null));
        
        await AsyncStorage.setItem(MEAL_WATER, JSON.stringify(null));
        
        await AsyncStorage.setItem(MEAL_BREAKFAST_RECOMMENDED_MIN, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_BREAKFAST_RECOMMENDED_MAX, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_BREAKFAST_TOTAL_CALORIES, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_BREAKFAST_TOTAL_CARBS, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_BREAKFAST_TOTAL_PROTEIN, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_BREAKFAST_TOTAL_FAT, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_BREAKFAST_FOODS, JSON.stringify([]));
        
        await AsyncStorage.setItem(MEAL_LUNCH_RECOMMENDED_MIN, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_LUNCH_RECOMMENDED_MAX, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_LUNCH_TOTAL_CALORIES, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_LUNCH_TOTAL_CARBS, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_LUNCH_TOTAL_PROTEIN, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_LUNCH_TOTAL_FAT, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_LUNCH_FOODS, JSON.stringify([]));
        
        await AsyncStorage.setItem(MEAL_DINNER_RECOMMENDED_MIN, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_DINNER_RECOMMENDED_MAX, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_DINNER_TOTAL_CALORIES, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_DINNER_TOTAL_CARBS, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_DINNER_TOTAL_PROTEIN, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_DINNER_TOTAL_FAT, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_DINNER_FOODS, JSON.stringify([]));
        return;
    } catch (error) {
        console.log(error);
    }
}



// check if the database exists
export async function ExistsDatabase() {
    try {
        const result = await AsyncStorage.getItem(DATABASE_STORE);
        return (result == CREATED_DATABASE_MESSAGE);
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
