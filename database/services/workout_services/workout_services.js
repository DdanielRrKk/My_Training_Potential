import AsyncStorage from '@react-native-async-storage/async-storage';
import { WORKOUT_KEY_STORE } from "../../database_stores";



export async function AddWorkoutPlan(
    name = null,
    description = null,
    per_week = null,
    average_time = null,
    type = null,
    gender_oriented = null,
    days = []
) {
    try {
        await AsyncStorage.getItem(WORKOUT_KEY_STORE, async (err, result) => {
            if (result == null || result == '[]') {
                // store has no data
                const workoutPlanKey = `${WORKOUT_KEY_STORE}/1`;
                const storeKeys = {
                    last_key: 1,
                    workout_keys: [workoutPlanKey]
                };

                await AsyncStorage.setItem(WORKOUT_KEY_STORE, JSON.stringify(storeKeys));
                await AsyncStorage.setItem(workoutPlanKey, JSON.stringify({
                    name: name,
                    description: description,
                    per_week: per_week,
                    average_time: average_time,
                    type: type,
                    gender_oriented: gender_oriented,
                    days: days
                }));
                return;
            }
            // store has data
            const storeKeys = JSON.parse(result);
            const workoutPlanKey = `${WORKOUT_KEY_STORE}/${++storeKeys.last_key}`;
            storeKeys.store_keys.push(workoutPlanKey);

            await AsyncStorage.setItem(WORKOUT_KEY_STORE, JSON.stringify(storeKeys));
            await AsyncStorage.setItem(workoutPlanKey, JSON.stringify({
                name: name,
                description: description,
                per_week: per_week,
                average_time: average_time,
                type: type,
                gender_oriented: gender_oriented,
                days: days
            }));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

async function setWorkoutPlanParameter(plan_key, param_number, parameter) {
    try {
        await AsyncStorage.getItem(plan_key, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const workoutPlan = JSON.parse(result);
            switch(param_number) {
                case 0: workoutPlan = parameter; break; // add / update workout plan
                case 1: workoutPlan.name = parameter; break; // add / update workout plan name
                case 2: workoutPlan.description = parameter; break; // add / update workout plan description
                case 3: workoutPlan.per_week = parameter; break; // add / update workout plan per week
                case 4: workoutPlan.average_time = parameter; break; // add / update workout plan time
                case 5: workoutPlan.type = parameter; break; // add / update workout plan type
                case 6: workoutPlan.gender_oriented = parameter; break; // add / update workout plan gender
                case 7: workoutPlan.days = parameter; break; // add / update workout plan days
                default: break;
            }
            await AsyncStorage.setItem(plan_key, JSON.stringify(workoutPlan));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}
async function setWorkoutPlanDaysParameter(plan_key, param_number, parameter) {
    try {
        await AsyncStorage.getItem(plan_key, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const workoutPlan = JSON.parse(result);
            switch(param_number) {
                case 0: workoutPlan = parameter; break; // add / update workout plan
                case 1: workoutPlan.name = parameter; break; // add / update workout plan name
                case 2: workoutPlan.description = parameter; break; // add / update workout plan description
                case 3: workoutPlan.per_week = parameter; break; // add / update workout plan per week
                case 4: workoutPlan.average_time = parameter; break; // add / update workout plan time
                case 5: workoutPlan.type = parameter; break; // add / update workout plan type
                case 6: workoutPlan.gender_oriented = parameter; break; // add / update workout plan gender
                case 7: workoutPlan.days = parameter; break; // add / update workout plan days
                default: break;
            }
            await AsyncStorage.setItem(plan_key, JSON.stringify(workoutPlan));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

async function getWorkoutPlanParameter(plan_key, param_number, setParameter) {
    try {
        await AsyncStorage.getItem(plan_key, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const workoutPlan = JSON.parse(result);
            switch(param_number) {
                case 0: setParameter(workoutPlan); break; // get workout plan 
                case 1: setParameter(workoutPlan.name); break; // get workout plan name
                case 2: setParameter(workoutPlan.description); break; // get workout plan description
                case 3: setParameter(workoutPlan.per_week); break; // get workout plan per week
                case 4: setParameter(workoutPlan.average_time); break; // get workout plan time
                case 5: setParameter(workoutPlan.type); break; // get workout plan type
                case 6: setParameter(workoutPlan.gender_oriented); break; // get workout plan gender
                case 7: setParameter(workoutPlan.days); break; // get workout plan days
                default: break;
            }
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// delete =====
export async function DeleteWorkoutPlan(plan_key) {
    try {
        await AsyncStorage.removeItem(plan_key);
        await AsyncStorage.getItem(WORKOUT_KEY_STORE, async (err, result) => {
            if (result == null || result == '[]') return; // store has no data
            // store has data
            const storeKeys = JSON.parse(result);

            for (let i = 0; i < storeKeys.workout_keys.length; i++) {
                if(storeKeys.workout_keys[i] == plan_key) {
                    storeKeys.workout_keys.splice(i, 1);
                    break;
                }
            }

            await AsyncStorage.setItem(WORKOUT_KEY_STORE, JSON.stringify(storeKeys));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// set workout plan =====
export async function SetWokroutPlan( 
    key, 
    name,
    per_week,
    time,
    type,
    gender,
    description
 ) {
    setWorkoutPlanParameter(key, 0, {
        name: name,
        per_week: per_week,
        time: time,
        type: type,
        gender: gender,
        description: description
    });
}
// set user name
export async function SetWokroutPlanName(key, name) {
    return setWorkoutPlanParameter(key, 1, name);
}
// set user gender
export async function SetWorkoutPlanDescription(key, description) {
    return setWorkoutPlanParameter(key, 2, description);
}
// set user age
export async function SetWorkoutPlanPerWeek(key, per_week) {
    return setWorkoutPlanParameter(key, 3, per_week);
}
// set user height
export async function SetWorkoutPlanTotalTime(key, total_time) {
    return setWorkoutPlanParameter(key, 4, total_time);
}
// set user weight
export async function SetWorkoutPlanType(key, type) {
    return setWorkoutPlanParameter(key, 5, type);
}
// set user gender
export async function SetWorkoutPlanGenderOriented(key, gender_oriented) {
    return setWorkoutPlanParameter(key, 6, gender_oriented);
}
// set user gender
export async function SetWorkoutPlanDays(key, days) {
    return setWorkoutPlanParameter(key, 7, days);
}



// get user =====
export async function GetWorkoutPlan(key, setWorkoutPlan) {
    return getWorkoutPlanParameter(key, 0, setWorkoutPlan);
}
// get user name
export async function GetWorkoutPlanName(key, setWorkoutPlanName) {
    return getWorkoutPlanParameter(key, 1, setWorkoutPlanName);
}
// get user gender
export async function GetWorkoutPlanDescription(key, setWorkoutPlanDescription) {
    return getWorkoutPlanParameter(key, 2, setWorkoutPlanDescription);
}
// get user age
export async function GetWorkoutPlanPerWeek(key, setWorkoutPlanPerWeek) {
    return getWorkoutPlanParameter(key, 3, setWorkoutPlanPerWeek);
}
// get user height
export async function GetWorkoutPlanTime(key, setWorkoutPlanTime) {
    return getWorkoutPlanParameter(key, 4, setWorkoutPlanTime);
}
// get user weight
export async function GetWorkoutPlanType(key, setWorkoutPlanType) {
    return getWorkoutPlanParameter(key, 5, setWorkoutPlanType);
}
// get user gender
export async function GetWorkoutPlanGender(key, setWorkoutPlanGender) {
    return getWorkoutPlanParameter(key, 6, setWorkoutPlanGender);
}
// get user gender
export async function GetWorkoutPlanDays(key, setWorkoutPlanDdays) {
    return getWorkoutPlanParameter(key, 7, setWorkoutPlanDdays);
}
