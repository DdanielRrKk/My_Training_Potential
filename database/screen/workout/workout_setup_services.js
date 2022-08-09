import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_STATE,
    WORKOUT_PLAN,
    USER_INFO
} from '../../database_stores';
import { getActivityLevelFromActiveDays } from '../../../helpers/helpers';
import { 
    SYSTEM_USER_SETUP,
    SYSTEM_USER_AND_MEAL_SETUP,
    SYSTEM_USER_AND_WORKOUT_SETUP,
    SYSTEM_ALL_SETUP 
} from '../../../helpers/constants';



export async function SetWorkoutPlan(name, type, workouts) {
    try {
        let activeDays = 0;
        if(type == 0) {
            for (let i = 0; i < workouts.length; i++) {
                if(workouts[i].name != null) activeDays++;
            }
        }
        else activeDays = workouts.length;

        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user back', user);
        user.activityLevel = getActivityLevelFromActiveDays(activeDays);
        await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));


        await AsyncStorage.setItem(WORKOUT_PLAN, JSON.stringify({
            current_workout: 0,
            name: name,
            type: type,
            workouts: workouts
        }));
        

        const systemStateResult = await AsyncStorage.getItem(SYSTEM_STATE);
        switch(parseInt(systemStateResult)) {
            case SYSTEM_USER_SETUP: await AsyncStorage.setItem(SYSTEM_STATE, JSON.stringify(SYSTEM_USER_AND_WORKOUT_SETUP)); break;
            case SYSTEM_USER_AND_MEAL_SETUP: await AsyncStorage.setItem(SYSTEM_STATE, JSON.stringify(SYSTEM_ALL_SETUP)); break;
            default: break;
        }
        return;
    } catch (error) {
        console.log('SetWorkoutPlan error');
        console.log(error);
    }
}
