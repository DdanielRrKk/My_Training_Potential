import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_STATE,
    USER_INFO,
    USER_GOALS,
    MEAL_BREAKFAST,
    MEAL_LUNCH,
    MEAL_DINNER,
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
    WORKOUT_LOG
} from '../database_stores';
import { 
    SYSTEM_STATE_SCHEMA,
    USER_INFO_SCHEMA,
    USER_GOALS_SCHEMA,
    MEAL_SCHEMA,
    WORKOUT_DAY_SCHEMA,
    LOG_SCHEMA
} from '../database_schemas';
import { 
    SYSTEM_USER_SETUP,
    SYSTEM_USER_AND_MEAL_SETUP,
    SYSTEM_USER_AND_WORKOUT_SETUP,
    SYSTEM_ALL_SETUP
} from '../../helpers/constants';



// create the database
export async function CreateDatabase() {
    try {
        await AsyncStorage.setItem(SYSTEM_STATE, JSON.stringify(SYSTEM_STATE_SCHEMA));
        
        await AsyncStorage.setItem(USER_INFO, JSON.stringify(USER_INFO_SCHEMA));
        
        await AsyncStorage.setItem(USER_GOALS, JSON.stringify(USER_GOALS_SCHEMA));
        
        await AsyncStorage.setItem(MEAL_BREAKFAST, JSON.stringify(MEAL_SCHEMA));
        await AsyncStorage.setItem(MEAL_LUNCH, JSON.stringify(MEAL_SCHEMA));
        await AsyncStorage.setItem(MEAL_DINNER, JSON.stringify(MEAL_SCHEMA));
        
        await AsyncStorage.setItem(WORKOUT_PLAN_NAME, JSON.stringify(null));
        
        await AsyncStorage.setItem(WORKOUT_MONDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        await AsyncStorage.setItem(WORKOUT_TUESDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        await AsyncStorage.setItem(WORKOUT_WEDNESDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        await AsyncStorage.setItem(WORKOUT_THURSDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        await AsyncStorage.setItem(WORKOUT_FRIDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        await AsyncStorage.setItem(WORKOUT_SATURDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        await AsyncStorage.setItem(WORKOUT_SUNDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        
        await AsyncStorage.setItem(WEIGHT_LOG, JSON.stringify(LOG_SCHEMA));
        await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(LOG_SCHEMA));
        await AsyncStorage.setItem(WORKOUT_LOG, JSON.stringify(LOG_SCHEMA));
        return;
    } catch (error) {
        console.log('CreateDatabase error');
        console.log(error);
    }
}



// check if the database exists
export async function IsDatabaseCreated() {
    try {
        const result = await AsyncStorage.getItem(SYSTEM_STATE);
        return (null != result);
    } catch (error) {
        console.log('IsDatabaseCreated error');
        console.log(error);
    }
}



// reset meal setup
export async function ResetMealSetup() {
    try {
        const systemStateResult = await AsyncStorage.getItem(SYSTEM_STATE);
        switch(parseInt(systemStateResult)) {
            case SYSTEM_USER_AND_MEAL_SETUP: 
                await AsyncStorage.setItem(SYSTEM_STATE, JSON.stringify(SYSTEM_USER_SETUP)); 

                const userResult = await AsyncStorage.getItem(USER_INFO);
                const user = JSON.parse(userResult);
                user.activityLevel = null;
                await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));
                break;

            case SYSTEM_ALL_SETUP: 
                await AsyncStorage.setItem(SYSTEM_STATE, JSON.stringify(SYSTEM_USER_AND_WORKOUT_SETUP)); 
                break;

            default: break;
        }

        await AsyncStorage.setItem(USER_GOALS, JSON.stringify(USER_GOALS_SCHEMA));
        await AsyncStorage.setItem(MEAL_BREAKFAST, JSON.stringify(MEAL_SCHEMA));
        await AsyncStorage.setItem(MEAL_LUNCH, JSON.stringify(MEAL_SCHEMA));
        await AsyncStorage.setItem(MEAL_DINNER, JSON.stringify(MEAL_SCHEMA));
        await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(LOG_SCHEMA));
        return;
    } catch (error) {
        console.log('ResetMealSetup error');
        console.log(error);
    }
}



// reset workout setup
export async function ResetWorkoutSetup() {
    try {
        const systemStateResult = await AsyncStorage.getItem(SYSTEM_STATE);
        switch(parseInt(systemStateResult)) {
            case SYSTEM_USER_AND_WORKOUT_SETUP: await AsyncStorage.setItem(SYSTEM_STATE, JSON.stringify(SYSTEM_USER_SETUP)); break;
            case SYSTEM_ALL_SETUP: await AsyncStorage.setItem(SYSTEM_STATE, JSON.stringify(SYSTEM_USER_AND_MEAL_SETUP)); break;
            default: break;
        }

        await AsyncStorage.setItem(WORKOUT_PLAN_NAME, JSON.stringify(null));
        
        await AsyncStorage.setItem(WORKOUT_MONDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        await AsyncStorage.setItem(WORKOUT_TUESDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        await AsyncStorage.setItem(WORKOUT_WEDNESDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        await AsyncStorage.setItem(WORKOUT_THURSDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        await AsyncStorage.setItem(WORKOUT_FRIDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        await AsyncStorage.setItem(WORKOUT_SATURDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        await AsyncStorage.setItem(WORKOUT_SUNDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));

        await AsyncStorage.setItem(WORKOUT_LOG, JSON.stringify(LOG_SCHEMA));
        return;
    } catch (error) {
        console.log('ResetWorkoutSetup error');
        console.log(error);
    }
}
