import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_STATE,
    WORKOUT_PLAN
} from '../../database_stores';
import { 
    SYSTEM_USER_AND_WORKOUT_SETUP, 
    SYSTEM_ALL_SETUP 
} from '../../../helpers/constants';



// get data for workout screen
export async function GetWorkoutScreenData() {
    try {
        const systemStateResult = await AsyncStorage.getItem(SYSTEM_STATE);
        const systemState = parseInt(systemStateResult);
        if(systemState != SYSTEM_USER_AND_WORKOUT_SETUP && systemState != SYSTEM_ALL_SETUP) {
            console.log('GetWorkoutScreenData is not setup');
            return {
                current_workout: null,
                name: null,
                type: null,
                workouts: null,
                isWorkoutSetup: false
            };
        }

        const workoutPlanResult = await AsyncStorage.getItem(WORKOUT_PLAN);
        // console.log('workoutPlanResult', workoutPlanResult);
        const workoutPlan = JSON.parse(workoutPlanResult);
        // console.log('workoutPlan', workoutPlan);

        return {
            current_workout: workoutPlan.current_workout,
            name: workoutPlan.name,
            type: workoutPlan.type,
            workouts: workoutPlan.workouts,
            isWorkoutSetup: true
        };     
    } catch (error) {
        console.log('GetWorkoutScreenData error');
        console.log(error);
    }
}
