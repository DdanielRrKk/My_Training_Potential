import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_IS_DATABASE_CREATED,
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
    MEAL_TOTAL_CALORIES,
    MEAL_TOTAL_CARBS,
    MEAL_TOTAL_PROTEIN,
    MEAL_TOTAL_FAT,
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
    MEAL_DINNER_FOODS,
    WEIGHT_LOG,
    STEPS_LOG
} from '../database_stores';



const CREATED_DATABASE_MESSAGE = 'created';

// create the database
export async function CreateDatabase() {
    try {
        await AsyncStorage.setItem(SYSTEM_IS_DATABASE_CREATED, CREATED_DATABASE_MESSAGE);

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
        
        await AsyncStorage.setItem(MEAL_TOTAL_CALORIES, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_TOTAL_CARBS, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_TOTAL_PROTEIN, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_TOTAL_FAT, JSON.stringify(null));
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

        await AsyncStorage.setItem(WEIGHT_LOG, JSON.stringify([]));
        return;
    } catch (error) {
        console.log(error);
    }
}



// check if the database exists
export async function ExistsDatabase() {
    try {
        const result = await AsyncStorage.getItem(SYSTEM_IS_DATABASE_CREATED);
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
