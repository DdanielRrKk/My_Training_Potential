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
    MEAL_LUNCH_RECOMMENDED_MIN,
    MEAL_LUNCH_RECOMMENDED_MAX,
    MEAL_LUNCH_TOTAL_CALORIES,
    MEAL_LUNCH_TOTAL_CARBS,
    MEAL_LUNCH_TOTAL_PROTEIN,
    MEAL_LUNCH_TOTAL_FAT,
    MEAL_DINNER_RECOMMENDED_MIN,
    MEAL_DINNER_RECOMMENDED_MAX,
    MEAL_DINNER_TOTAL_CALORIES,
    MEAL_DINNER_TOTAL_CARBS,
    MEAL_DINNER_TOTAL_PROTEIN,
    MEAL_DINNER_TOTAL_FAT
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
        
        await AsyncStorage.setItem(MEAL_LUNCH_RECOMMENDED_MIN, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_LUNCH_RECOMMENDED_MAX, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_LUNCH_TOTAL_CALORIES, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_LUNCH_TOTAL_CARBS, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_LUNCH_TOTAL_PROTEIN, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_LUNCH_TOTAL_FAT, JSON.stringify(null));
        
        await AsyncStorage.setItem(MEAL_DINNER_RECOMMENDED_MIN, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_DINNER_RECOMMENDED_MAX, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_DINNER_TOTAL_CALORIES, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_DINNER_TOTAL_CARBS, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_DINNER_TOTAL_PROTEIN, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_DINNER_TOTAL_FAT, JSON.stringify(null));
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



function checkIsCorrectResult(result) {
    return (result === null || result === '');
}

// get data for home screen
export async function GetHomeScreenData() {
    try {
        const user_preference_result = await AsyncStorage.getItem(USER_PREFERENCES_STORE);
        // console.log('user_preference_result', user_preference_result);
        if(checkIsCorrectResult(user_preference_result)) return console.log('USER_PREFERENCES_STORE has no data'); 
        
        const user_data_result = await AsyncStorage.getItem(USER_DATA_STORE);
        // console.log('user_data_result', user_data_result);
        if(checkIsCorrectResult(user_data_result)) return console.log('USER_DATA_STORE has no data'); 
        
        const user_meal_result = await AsyncStorage.getItem(USER_MEALS_STORE);
        // console.log('user_meal_result', user_meal_result);
        if(checkIsCorrectResult(user_meal_result)) return console.log('USER_MEALS_STORE has no data'); 

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
        // console.log('user_preference_result', user_preference_result);
        if(checkIsCorrectResult(user_preference_result)) return console.log('USER_PREFERENCES_STORE has no data'); 
        
        const user_meal_result = await AsyncStorage.getItem(USER_MEALS_STORE);
        // console.log('user_meal_result', user_meal_result);
        if(checkIsCorrectResult(user_meal_result)) return console.log('USER_MEALS_STORE has no data'); 

        const meal_breakfast_result = await AsyncStorage.getItem(MEAL_BREAKFAST_STORE);
        console.log('meal_breakfast_result', meal_breakfast_result);
        if(checkIsCorrectResult(meal_breakfast_result)) return console.log('MEAL_BREAKFAST_STORE has no data'); 
        
        const meal_lunch_result = await AsyncStorage.getItem(MEAL_LUNCH_STORE);
        // console.log('meal_lunch_result', meal_lunch_result);
        if(checkIsCorrectResult(meal_lunch_result)) return console.log('MEAL_LUNCH_STORE has no data'); 

        const meal_dinner_result = await AsyncStorage.getItem(MEAL_DINNER_STORE);
        // console.log('meal_dinner_result', meal_dinner_result);
        if(checkIsCorrectResult(meal_dinner_result)) return console.log('MEAL_DINNER_STORE has no data'); 

        // store has data
        const user_preference = JSON.parse(user_preference_result);
        const user_meal = JSON.parse(user_meal_result);
        const meal_breakfast = JSON.parse(meal_breakfast_result);
        const meal_lunch = JSON.parse(meal_lunch_result);
        const meal_dinner = JSON.parse(meal_dinner_result);

        // console.log('user_preference', user_preference);
        // console.log('user_meal', user_meal);
        // console.log('meal_breakfast', meal_breakfast);
        // console.log('meal_lunch', meal_lunch);
        // console.log('meal_dinner', meal_dinner);

        return {
            isMealReady: user_preference.is_meal_ready,
            calories: user_meal.calories_goal,
            carbs: user_meal.carbs_goal,
            protein: user_meal.protein_goal,
            fat: user_meal.fat_goal,
            breakfastCalories: meal_breakfast.total_calories,
            lunchCalories: meal_lunch.total_calories,
            dinnerCalories: meal_dinner.total_calories,
        }        
    } catch (error) {
        console.log(error);
    }
}