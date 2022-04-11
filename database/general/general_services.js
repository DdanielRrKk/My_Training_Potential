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
    WORKOUT_PLAN_NAME,
    WORKOUT_MONDAY,
    WORKOUT_TUESDAY,
    WORKOUT_WEDNESDAY,
    WORKOUT_THURSDAY,
    WORKOUT_FRIDAY,
    WORKOUT_SATURDAY,
    WORKOUT_SUNDAY,
    WEIGHT_LOG,
    MEAL_LOG,
    WORKOUT_LOG,

    SYSTEM_FLAGS,
    USER_INFO,
    USER_GOALS,
    MEAL_BREAKFAST,
    MEAL_LUNCH,
    MEAL_DINNER
} from '../database_stores';
import { 
    SYSTEM_FLAGS_SCHEMA,
    USER_INFO_SCHEMA,
    USER_GOALS_SCHEMA,
    MEAL_SCHEMA,
    WORKOUT_DAY_SCHEMA,
    LOG_SCHEMA
} from '../database_schemas';



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
        
        await AsyncStorage.setItem(WORKOUT_PLAN_NAME, JSON.stringify(null));
        
        await AsyncStorage.setItem(WORKOUT_MONDAY, JSON.stringify(null));
        await AsyncStorage.setItem(WORKOUT_TUESDAY, JSON.stringify(null));
        await AsyncStorage.setItem(WORKOUT_WEDNESDAY, JSON.stringify(null));
        await AsyncStorage.setItem(WORKOUT_THURSDAY, JSON.stringify(null));
        await AsyncStorage.setItem(WORKOUT_FRIDAY, JSON.stringify(null));
        await AsyncStorage.setItem(WORKOUT_SATURDAY, JSON.stringify(null));
        await AsyncStorage.setItem(WORKOUT_SUNDAY, JSON.stringify(null));

        // test
        await AsyncStorage.setItem(SYSTEM_FLAGS, JSON.stringify(SYSTEM_FLAGS_SCHEMA));

        await AsyncStorage.setItem(USER_INFO, JSON.stringify(USER_INFO_SCHEMA));
        await AsyncStorage.setItem(USER_GOALS, JSON.stringify(USER_GOALS_SCHEMA));

        // await AsyncStorage.setItem(WORKOUT_MONDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        // await AsyncStorage.setItem(WORKOUT_TUESDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        // await AsyncStorage.setItem(WORKOUT_WEDNESDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        // await AsyncStorage.setItem(WORKOUT_THURSDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        // await AsyncStorage.setItem(WORKOUT_FRIDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        // await AsyncStorage.setItem(WORKOUT_SATURDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        // await AsyncStorage.setItem(WORKOUT_SUNDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));

        await AsyncStorage.setItem(MEAL_BREAKFAST, JSON.stringify(MEAL_SCHEMA));
        await AsyncStorage.setItem(MEAL_LUNCH, JSON.stringify(MEAL_SCHEMA));
        await AsyncStorage.setItem(MEAL_DINNER, JSON.stringify(MEAL_SCHEMA));
        
        await AsyncStorage.setItem(WEIGHT_LOG, JSON.stringify(LOG_SCHEMA));
        await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(LOG_SCHEMA));
        await AsyncStorage.setItem(WORKOUT_LOG, JSON.stringify(LOG_SCHEMA));
        // test
        return;
    } catch (error) {
        console.log('CreateDatabase error');
        console.log(error);
    }
}



// check if the database exists
export async function ExistsDatabase() {
    try {
        const result = await AsyncStorage.getItem(SYSTEM_IS_DATABASE_CREATED);
        return (result == CREATED_DATABASE_MESSAGE);
    } catch (error) {
        console.log('ExistsDatabase error');
        console.log(error);
    }
}



// reset meal setup
export async function ResetMealSetup(isWorkoutSetup) {
    try {
        console.log('isWorkoutSetup', isWorkoutSetup);
        if(!isWorkoutSetup) {
            const userResult = await AsyncStorage.getItem(USER_INFO);
            const user = JSON.parse(userResult);
            user.activityLevel = null;
            await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));
        }

        await AsyncStorage.setItem(USER_GOALS, JSON.stringify(USER_GOALS_SCHEMA));
        await AsyncStorage.setItem(MEAL_BREAKFAST, JSON.stringify(MEAL_SCHEMA));
        await AsyncStorage.setItem(MEAL_LUNCH, JSON.stringify(MEAL_SCHEMA));
        await AsyncStorage.setItem(MEAL_DINNER, JSON.stringify(MEAL_SCHEMA));
        await AsyncStorage.setItem(MEAL_LOG, JSON.stringify([]));
        return;
    } catch (error) {
        console.log('ResetMealSetup error');
        console.log(error);
    }
}



// reset workout setup
export async function ResetWorkoutSetup() {
    try {
        await AsyncStorage.setItem(SYSTEM_IS_WORKOUT_SETUP, JSON.stringify(false));
        
        await AsyncStorage.setItem(WORKOUT_PLAN_NAME, JSON.stringify(null));
        
        await AsyncStorage.setItem(WORKOUT_MONDAY, JSON.stringify(null));
        await AsyncStorage.setItem(WORKOUT_TUESDAY, JSON.stringify(null));
        await AsyncStorage.setItem(WORKOUT_WEDNESDAY, JSON.stringify(null));
        await AsyncStorage.setItem(WORKOUT_THURSDAY, JSON.stringify(null));
        await AsyncStorage.setItem(WORKOUT_FRIDAY, JSON.stringify(null));
        await AsyncStorage.setItem(WORKOUT_SATURDAY, JSON.stringify(null));
        await AsyncStorage.setItem(WORKOUT_SUNDAY, JSON.stringify(null));

        await AsyncStorage.setItem(WORKOUT_LOG, JSON.stringify([]));
        return;
    } catch (error) {
        console.log('ResetWorkoutSetup error');
        console.log(error);
    }
}
