import AsyncStorage from '@react-native-async-storage/async-storage';



async function setWorkoutPlanDayParameter(plan_key, day_key, param_number, parameter) {
    try {
        await AsyncStorage.getItem(plan_key, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const workoutPlan = JSON.parse(result);
            switch(param_number) {
                case 0: workoutPlan.days[day_key - 1] = parameter; break; // add / update workout plan day 
                case 1: workoutPlan.days[day_key - 1].name = parameter; break; // add / update workout plan day name
                case 2: workoutPlan.days[day_key - 1].exercises_count = parameter; break; // add / update workout plan day exercises count
                case 3: workoutPlan.days[day_key - 1].total_time = parameter; break; // add / update workout plan day total time
                case 4: workoutPlan.days[day_key - 1].exercises = parameter; break; // add / update workout plan day ecxercises
                default: break;
            }
            await AsyncStorage.setItem(plan_key, JSON.stringify(workoutPlan));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

async function getWorkoutPlanDayParameter(plan_key, day_key, param_number, setParameter) {
    try {
        await AsyncStorage.getItem(plan_key, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const workoutPlan = JSON.parse(result);
            switch(param_number) {
                case 0: setParameter(workoutPlan.days[day_key - 1]); break; // get workout plan day
                case 1: setParameter(workoutPlan.days[day_key - 1].name); break; // get workout plan day name
                case 2: setParameter(workoutPlan.days[day_key - 1].exercises_count); break; // get workout plan day exercises count
                case 3: setParameter(workoutPlan.days[day_key - 1].total_time); break; // get workout plan day total time
                case 4: setParameter(workoutPlan.days[day_key - 1].exercises); break; // get workout plan day ecxercises
                default: break;
            }
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// set workout plan day =====
export async function SetWokroutPlanDay(
    plan_key, 
    day_key,
    name = null,
    exercises_count = null,
    total_time = null,
    exercises = []
 ) {
    setWorkoutPlanDayParameter(plan_key, day_key, 0, {
        name: name,
        exercises_count: exercises_count,
        total_time: total_time,
        exercises: exercises
    });
}
// set workout plan day name
export async function SetWokroutPlanDayName(plan_key, day_key, name) {
    return setWorkoutPlanDayParameter(plan_key, day_key, 1, name);
}
// set workout plan day exercises count
export async function SetWorkoutPlanDayExercisesCount(plan_key, day_key, exercises_count) {
    return setWorkoutPlanDayParameter(plan_key, day_key, 2, exercises_count);
}
// set workout plan day total time
export async function SetWorkoutPlanTotalTime(plan_key, day_key, total_time) {
    return setWorkoutPlanDayParameter(plan_key, day_key, 3, total_time);
}
// set workout plan day ecxercises
export async function SetWorkoutPlanExercises(plan_key, day_key, exercises) {
    return setWorkoutPlanDayParameter(plan_key, day_key, 4, exercises);
}



// get workout plan day =====
export async function GetWorkoutPlanDay(plan_key, day_key, setWorkoutPlanDay) {
    return getWorkoutPlanDayParameter(plan_key, day_key, 0, setWorkoutPlanDay);
}
// get workout plan day name
export async function GetWorkoutPlanDayName(plan_key, day_key, setWorkoutPlanDayName) {
    return getWorkoutPlanDayParameter(plan_key, day_key, 1, setWorkoutPlanDayName);
}
// get workout plan day exercises count
export async function GetWorkoutPlanDayExercisesCount(plan_key, day_key, setWorkoutPlanDayExercisesCount) {
    return getWorkoutPlanDayParameter(plan_key, day_key, 2, setWorkoutPlanDayExercisesCount);
}
// get workout plan day total time
export async function GetWorkoutPlanDayTotalTime(plan_key, day_key, setWorkoutPlanDayTotalTime) {
    return getWorkoutPlanDayParameter(plan_key, day_key, 3, setWorkoutPlanDayTotalTime);
}
// get workout plan day ecxercises
export async function GetWorkoutPlanDayExercises(plan_key, day_key, setWorkoutPlanDayExercises) {
    return getWorkoutPlanDayParameter(plan_key, day_key, 4, setWorkoutPlanDayExercises);
}
