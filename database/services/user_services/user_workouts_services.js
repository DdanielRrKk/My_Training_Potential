import { USER_WORKOUTS_STORE } from "../../database_stores";
import { 
    InsertSingle,
    UpdateSingle,
    DeleteSingle,
    SelectSingle
} from "../../general/single_services";



// insert
export async function InsertUserWorkouts(
    workout_goal, 
    time,
    available_days,
    workout_plan_key
    ) 
    {
    InsertSingle(USER_WORKOUTS_STORE, {
        workout_goal: workout_goal,
        time: time,
        available_days: available_days,
        workout_plan_key: workout_plan_key
    });
}

// update
export async function UpdateUserWorkouts(
    workout_goal = null, 
    time = null, 
    available_days = null,
    workout_plan_key = null
    ) 
    {
    UpdateSingle(USER_WORKOUTS_STORE, {
        workout_goal: workout_goal,
        time: time,
        available_days: available_days,
        workout_plan_key: workout_plan_key
    });
}

// delete
export async function DeleteUserWorkouts() {
    DeleteSingle(USER_WORKOUTS_STORE);
}

// select
export async function SelectUserWorkouts(setUserWorkouts) {
    return SelectSingle(USER_WORKOUTS_STORE, setUserWorkouts);
}