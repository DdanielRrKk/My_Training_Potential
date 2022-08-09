import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_STATE,
    SYSTEM_NOTIFICATIONS,
    USER_INFO,
    USER_GOALS,
    MEAL_BREAKFAST,
    MEAL_LUNCH,
    MEAL_DINNER,
    WORKOUT_PLAN,
    WEIGHT_LOG,
    MEAL_LOG,
    WORKOUT_LOG,
    STEPS_LOG
} from '../database_stores';
import { 
    SYSTEM_STATE_SCHEMA,
    SYSTEM_NOTIFICATIONS_SCHEMA,
    USER_INFO_SCHEMA,
    USER_GOALS_SCHEMA,
    MEAL_SCHEMA,
    WORKOUT_PLAN_SCHEMA,
    LOG_SCHEMA
} from '../database_schemas';
import { 
    SYSTEM_USER_SETUP,
    SYSTEM_USER_AND_MEAL_SETUP,
    SYSTEM_USER_AND_WORKOUT_SETUP,
    SYSTEM_ALL_SETUP
} from '../../helpers/constants';



// create the database
export async function CreateDatabase(deleteAll = false) {
    try {
        if(deleteAll) await AsyncStorage.clear();

        let isNewStorageCreated = false;

        const result11 = await AsyncStorage.getItem(SYSTEM_STATE);
        if(result11 == null) {
            await AsyncStorage.setItem(SYSTEM_STATE, JSON.stringify(SYSTEM_STATE_SCHEMA));
            isNewStorageCreated = true;
        }

        const result12 = await AsyncStorage.getItem(SYSTEM_NOTIFICATIONS);
        if(result12 == null) {
            await AsyncStorage.setItem(SYSTEM_NOTIFICATIONS, JSON.stringify(SYSTEM_NOTIFICATIONS_SCHEMA));
            isNewStorageCreated = true;
        }
        


        const result21 = await AsyncStorage.getItem(USER_INFO);
        if(result21 == null) {
            await AsyncStorage.setItem(USER_INFO, JSON.stringify(USER_INFO_SCHEMA));
            isNewStorageCreated = true;
        }
        
        const result22 = await AsyncStorage.getItem(USER_GOALS);
        if(result22 == null) {
            await AsyncStorage.setItem(USER_GOALS, JSON.stringify(USER_GOALS_SCHEMA));
            isNewStorageCreated = true;
        }
        


        const result31 = await AsyncStorage.getItem(MEAL_BREAKFAST);
        if(result31 == null) {
            await AsyncStorage.setItem(MEAL_BREAKFAST, JSON.stringify(MEAL_SCHEMA));
            isNewStorageCreated = true;
        }
        
        const result32 = await AsyncStorage.getItem(MEAL_LUNCH);
        if(result32 == null) {
            await AsyncStorage.setItem(MEAL_LUNCH, JSON.stringify(MEAL_SCHEMA));
            isNewStorageCreated = true;
        }
        
        const result33 = await AsyncStorage.getItem(MEAL_DINNER);
        if(result33 == null) {
            await AsyncStorage.setItem(MEAL_DINNER, JSON.stringify(MEAL_SCHEMA));
            isNewStorageCreated = true;
        }
        


        const result4 = await AsyncStorage.getItem(WORKOUT_PLAN);
        if(result4 == null) {
            await AsyncStorage.setItem(WORKOUT_PLAN, JSON.stringify(null));
            isNewStorageCreated = true;
        }
        


        const result51 = await AsyncStorage.getItem(WEIGHT_LOG);
        if(result51 == null) {
            await AsyncStorage.setItem(WEIGHT_LOG, JSON.stringify(LOG_SCHEMA));
            isNewStorageCreated = true;
        }
        
        const result52 = await AsyncStorage.getItem(MEAL_LOG);
        if(result52 == null) {
            await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(LOG_SCHEMA));
            isNewStorageCreated = true;
        }
        
        const result53 = await AsyncStorage.getItem(WORKOUT_LOG);
        if(result53 == null) {
            await AsyncStorage.setItem(WORKOUT_LOG, JSON.stringify(LOG_SCHEMA));
            isNewStorageCreated = true;
        }
        
        const result54 = await AsyncStorage.getItem(STEPS_LOG);
        if(result54 == null) {
            await AsyncStorage.setItem(STEPS_LOG, JSON.stringify(LOG_SCHEMA));
            isNewStorageCreated = true;
        }
        
        return isNewStorageCreated;
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
        await AsyncStorage.setItem(WORKOUT_PLAN, JSON.stringify(WORKOUT_PLAN_SCHEMA));
        await AsyncStorage.setItem(WORKOUT_LOG, JSON.stringify(LOG_SCHEMA));
        return;
    } catch (error) {
        console.log('ResetWorkoutSetup error');
        console.log(error);
    }
}
