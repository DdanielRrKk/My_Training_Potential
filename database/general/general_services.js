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
    WORKOUT_LOG,
    STEPS_LOG
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
        const result1 = await AsyncStorage.getItem(SYSTEM_STATE);
        if(result1 == null) await AsyncStorage.setItem(SYSTEM_STATE, JSON.stringify(SYSTEM_STATE_SCHEMA));
        


        const result2 = await AsyncStorage.getItem(USER_INFO);
        if(result2 == null) await AsyncStorage.setItem(USER_INFO, JSON.stringify(USER_INFO_SCHEMA));
        


        const result3 = await AsyncStorage.getItem(USER_GOALS);
        if(result3 == null) await AsyncStorage.setItem(USER_GOALS, JSON.stringify(USER_GOALS_SCHEMA));
        


        const result4 = await AsyncStorage.getItem(MEAL_BREAKFAST);
        if(result4 == null) await AsyncStorage.setItem(MEAL_BREAKFAST, JSON.stringify(MEAL_SCHEMA));
        
        const result5 = await AsyncStorage.getItem(MEAL_LUNCH);
        if(result5 == null) await AsyncStorage.setItem(MEAL_LUNCH, JSON.stringify(MEAL_SCHEMA));
        
        const result6 = await AsyncStorage.getItem(MEAL_DINNER);
        if(result6 == null) await AsyncStorage.setItem(MEAL_DINNER, JSON.stringify(MEAL_SCHEMA));
        


        const result7 = await AsyncStorage.getItem(WORKOUT_PLAN_NAME);
        if(result7 == null) await AsyncStorage.setItem(WORKOUT_PLAN_NAME, JSON.stringify(null));
        


        const result8 = await AsyncStorage.getItem(WORKOUT_MONDAY);
        if(result8 == null) await AsyncStorage.setItem(WORKOUT_MONDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        
        const result9 = await AsyncStorage.getItem(WORKOUT_TUESDAY);
        if(result9 == null) await AsyncStorage.setItem(WORKOUT_TUESDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        
        const result10 = await AsyncStorage.getItem(WORKOUT_WEDNESDAY);
        if(result10 == null) await AsyncStorage.setItem(WORKOUT_WEDNESDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        
        const result11 = await AsyncStorage.getItem(WORKOUT_THURSDAY);
        if(result11 == null) await AsyncStorage.setItem(WORKOUT_THURSDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        
        const result12 = await AsyncStorage.getItem(WORKOUT_FRIDAY);
        if(result12 == null) await AsyncStorage.setItem(WORKOUT_FRIDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        
        const result13 = await AsyncStorage.getItem(WORKOUT_SATURDAY);
        if(result13 == null) await AsyncStorage.setItem(WORKOUT_SATURDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        
        const result14 = await AsyncStorage.getItem(WORKOUT_SUNDAY);
        if(result14 == null) await AsyncStorage.setItem(WORKOUT_SUNDAY, JSON.stringify(WORKOUT_DAY_SCHEMA));
        


        const result15 = await AsyncStorage.getItem(WEIGHT_LOG);
        if(result15 == null) await AsyncStorage.setItem(WEIGHT_LOG, JSON.stringify(LOG_SCHEMA));
        
        const result16 = await AsyncStorage.getItem(MEAL_LOG);
        if(result16 == null) await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(LOG_SCHEMA));
        
        const result17 = await AsyncStorage.getItem(WORKOUT_LOG);
        if(result17 == null) await AsyncStorage.setItem(WORKOUT_LOG, JSON.stringify(LOG_SCHEMA));
        
        const result18 = await AsyncStorage.getItem(STEPS_LOG);
        if(result18 == null) await AsyncStorage.setItem(STEPS_LOG, JSON.stringify(LOG_SCHEMA));
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
