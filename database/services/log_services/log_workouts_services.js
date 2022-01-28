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