import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOG_WORKOUTS_STORE } from "../../database_stores";
import { LOG_SCHEMA } from '../../database_shemas';
import { 
    getCurrentDateForLogs,
    isCurrentDateForLogs 
} from '../../../helpers/dateHelper';



// delete =====
export async function DeleteMealLog() {
    await AsyncStorage.setItem(LOG_WORKOUTS_STORE, JSON.stringify(LOG_SCHEMA));
}



// set log =====
export async function SetWorkoutLog( 
    workout_name,
    completed_exercises,
    duration,
    note
 ) {
    try {
        await AsyncStorage.getItem(LOG_WORKOUTS_STORE, async (err, result) => {
            if (result == null || result == '[]') {
                // object has no data
                const date = getCurrentDateForLogs();
                const log = [{
                    key: 1,
                    workout_name: workout_name,
                    completed_exercises: completed_exercises,
                    duration: duration,
                    note: note,
                    date: date
                }];

                await AsyncStorage.setItem(LOG_WORKOUTS_STORE, JSON.stringify(log));
                return;
            }
            // object has data
            const log = JSON.parse(result);
            const lastLog = log[log.length - 1];

            if(isCurrentDateForLogs(lastLog.date)) {
                log[log.length - 1].workout_name = workout_name;
                log[log.length - 1].completed_exercises = completed_exercises;
                log[log.length - 1].duration = duration;
                log[log.length - 1].note = note;
                
                await AsyncStorage.setItem(LOG_WORKOUTS_STORE, JSON.stringify(log));
                return;
            }

            const date = getCurrentDateForLogs();
            log.push({
                key: lastLog + 1,
                workout_name: workout_name,
                completed_exercises: completed_exercises,
                duration: duration,
                note: note,
                date: date
            });
            
            await AsyncStorage.setItem(LOG_WORKOUTS_STORE, JSON.stringify(log));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

// get meal log =====
export async function GetWorkoutLog(setWorkoutLog) {
    try {
        await AsyncStorage.getItem(LOG_WORKOUTS_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            return setWorkoutLog(JSON.parse(result));
        });
    } catch (error) {
        console.log(error);
    }
}








import { LOG_WORKOUTS_STORE } from "../../database_stores";
import { 
    Insert,
    Delete,
    SelectAll
} from "../../general/database";



// insert
export async function InsertLogWorkout( 
    name,
    duration,
    time_under_tention,
    note,
    completed_exercises
    ) 
    {
    const today = new Date();
    const recordedDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    Insert(LOG_WORKOUTS_STORE, {
        key: null,
        name: name,
        duration: duration,
        time_under_tention: time_under_tention,
        note: note,
        completed_exercises: completed_exercises,
        date: recordedDate
    });
}

// delete
export async function DeleteLogWorkout(key) {
    Delete(LOG_WORKOUTS_STORE, key);
}

// select
export async function SelectAllLogWorkouts(setLogWorkouts) {
    return SelectAll(LOG_WORKOUTS_STORE, setLogWorkouts);
}