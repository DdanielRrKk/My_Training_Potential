import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_WORKOUTS_STORE } from "../../database_stores";
import { USER_WORKOUTS_SHEMA as USER_WORKOUTS_SCHEMA } from '../../database_shemas';



async function setUserWorkoutsParameter(param_number, parameter) {
    try {
        if(param_number == 0) { // add new user workouts
            await AsyncStorage.setItem(USER_WORKOUTS_STORE, JSON.stringify(parameter));
            return;
        }

        await AsyncStorage.getItem(USER_WORKOUTS_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const user = JSON.parse(result);
            switch(param_number) {
                case 1: user.workout_goal = parameter; break; // add / update user workout goal (to lose fat, gain muscle, ...)
                case 2: user.total_duration = parameter; break; // add / update user workout total duration
                case 3: user.available_days = parameter; break; // add / update user workout days
                default: break;
            }
            await AsyncStorage.setItem(USER_WORKOUTS_STORE, JSON.stringify(user));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

async function getUserWorkoutsParameter(param_number, setParameter) {
    try {
        await AsyncStorage.getItem(USER_WORKOUTS_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const user = JSON.parse(result);
            switch(param_number) {
                case 0: setParameter(user); break; // get user workouts
                case 1: setParameter(user.workout_goal); break; // get user workout goal (to lose fat, gain muscle, ...)
                case 2: setParameter(user.total_duration); break; // get user workout total duration
                case 3: setParameter(user.available_days); break; // get user workout days
                default: break;
            }
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// delete =====
export async function DeleteUserWorkouts() {
    await AsyncStorage.setItem(USER_WORKOUTS_STORE, JSON.stringify(USER_WORKOUTS_SCHEMA));
}



// set user workouts =====
export async function SetUserWorkouts( 
    workout_goal, 
    total_duration, 
    available_days
    ) {
    setUserWorkoutsParameter(0, {
        workout_goal: workout_goal,
        total_duration: total_duration,
        available_days: available_days
    });
}
// set user workout goal (to lose fat, gain muscle, ...)
export async function SetUserWorkoutsGoal(workout_goal) {
    return setUserWorkoutsParameter(1, workout_goal);
}
// set user workout total duration
export async function SetUserWorkoutsTotalDuration(total_duration) {
    return setUserWorkoutsParameter(2, total_duration);
}
// set user workout days
export async function SetUserWorkoutsAvailableDays(available_days) {
    return setUserWorkoutsParameter(3, available_days);
}



// get user workouts =====
export async function GetUserWorkouts(setUserWorkouts) {
    return getUserWorkoutsParameter(0, setUserWorkouts);
}
// get user workout goal (to lose fat, gain muscle, ...)
export async function GetUserWorkoutsGoal(setUserWorkoutsGoal) {
    return getUserWorkoutsParameter(1, setUserWorkoutsGoal);
}
// get user workout total duration
export async function GetUserWorkoutsTotalDuration(setUserWorkoutsTotalDuration) {
    return getUserWorkoutsParameter(2, setUserWorkoutsTotalDuration);
}
// get user workout days
export async function GetUserWorkoutsAvailableDays(setUserWorkoutsAvailableDays) {
    return getUserWorkoutsParameter(3, setUserWorkoutsAvailableDays);
}