import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    DATABASE_STORE,
    USER_DATA_STORE,
    USER_WORKOUTS_STORE,
    USER_MEALS_STORE,
    USER_PREFERENCES_STORE,
    MEAL_BREACKFAST_STORE,
    MEAL_DINNER_STORE,
    MEAL_LUNCH_STORE,
    MEAL_WATER_STORE,
    MEAL_CURRENT_DATA_STORE,
    LOG_STEPS_STORE,
    LOG_WEIGHT_STORE,
    LOG_MEALS_STORE,
    LOG_WORKOUTS_STORE,
    WORKOUT_KEY_STORE
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



// create the database
export async function CreateDatabase() {
    try {
        await AsyncStorage.setItem(DATABASE_STORE, 'created');

        await AsyncStorage.setItem(USER_DATA_STORE, JSON.stringify(USER_DATA_SCHEMA));
        await AsyncStorage.setItem(USER_MEALS_STORE, JSON.stringify(USER_MEALS_SCHEMA));
        await AsyncStorage.setItem(USER_WORKOUTS_STORE, JSON.stringify(USER_WORKOUTS_SCHEMA));
        await AsyncStorage.setItem(USER_PREFERENCES_STORE, JSON.stringify(USER_PREFERENCES_SCHEMA));


        await AsyncStorage.setItem(MEAL_BREACKFAST_STORE, JSON.stringify(MEAL_MAIN_SCHEMA));
        await AsyncStorage.setItem(MEAL_DINNER_STORE, JSON.stringify(MEAL_MAIN_SCHEMA));
        await AsyncStorage.setItem(MEAL_LUNCH_STORE, JSON.stringify(MEAL_MAIN_SCHEMA));
        await AsyncStorage.setItem(MEAL_WATER_STORE, JSON.stringify(MEAL_WATER_SCHEMA));
        await AsyncStorage.setItem(MEAL_CURRENT_DATA_STORE, JSON.stringify(MEAL_CURRENT_DATA_SCHEMA));


        await AsyncStorage.setItem(LOG_STEPS_STORE, JSON.stringify(LOG_SCHEMA));
        await AsyncStorage.setItem(LOG_WEIGHT_STORE, JSON.stringify(LOG_SCHEMA));
        await AsyncStorage.setItem(LOG_MEALS_STORE, JSON.stringify(LOG_SCHEMA));
        await AsyncStorage.setItem(LOG_WORKOUTS_STORE, JSON.stringify(LOG_SCHEMA));
        
        await AsyncStorage.setItem(WORKOUT_KEY_STORE, JSON.stringify(WORKOUT_SCHEMA));
        return;
    } catch (error) {
        console.log(error);
    }
}



// check if the database exists
export async function ExistsDatabase() {
    try {
        const result = await AsyncStorage.getItem(DATABASE_STORE);
        if(result == null || result == '') return false;
        return true;
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



// get data for home screen
export async function GetHomeScreenData() {
    try {
        const user_preference_result = await AsyncStorage.getItem(USER_PREFERENCES_STORE);
        if(user_preference_result === null || user_preference_result === '') return console.log('store has no data'); // store has no data
        
        const user_data_result = await AsyncStorage.getItem(USER_DATA_STORE);
        if(user_data_result === null || user_data_result === '') return console.log('store has no data'); // store has no data
        
        const user_meal_result = await AsyncStorage.getItem(USER_MEALS_STORE);
        if(user_meal_result === null || user_meal_result === '') return console.log('store has no data'); // store has no data

        // store has data
        const user_preference = JSON.parse(user_preference_result);
        const user_data = JSON.parse(user_data_result);
        const user_meal = JSON.parse(user_meal_result);

        // console.log('user_preference', user_preference);
        // console.log('user_data', user_data);
        // console.log('user_meal', user_meal);

        return {
            isMealReady: user_preference.is_meal_ready,
            name: user_data.name,
            weight: user_data.weight,
            calories: user_meal.calories_goal,
            carbs: user_meal.carbs_goal,
            protein: user_meal.protein_goal,
            fat: user_meal.fat_goal
        }        
    } catch (error) {
        console.log(error);
    }
}

// get data for meal screen
export async function GetMealScreenData() {
    try {
        const user_preference_result = await AsyncStorage.getItem(USER_PREFERENCES_STORE);
        if(user_preference_result === null || user_preference_result === '') return console.log('store has no data'); // store has no data
        
        const user_meal_result = await AsyncStorage.getItem(USER_MEALS_STORE);
        if(user_meal_result === null || user_meal_result === '') return console.log('store has no data'); // store has no data

        // store has data
        const user_preference = JSON.parse(user_preference_result);
        const user_meal = JSON.parse(user_meal_result);

        // console.log('user_preference', user_preference);
        // console.log('user_meal', user_meal);

        return {
            isMealReady: user_preference.is_meal_ready,
            calories: user_meal.calories_goal,
            carbs: user_meal.carbs_goal,
            protein: user_meal.protein_goal,
            fat: user_meal.fat_goal
        }        
    } catch (error) {
        console.log(error);
    }
}