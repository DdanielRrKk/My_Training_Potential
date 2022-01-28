import { WORKOUT_PLANS_KEYS_STORE } from "../../database_stores";
import { 
    InsertWithRelations,
    Update,
    DeleteWithRelations,
    SelectRelations
} from "../../general/database_services";



// insert
export async function InsertWorkoutPlan( 
    name,
    days_count,
    total_time,
    type,
    description
    ) 
    {
    Insert(WORKOUT_PLANS_KEYS_STORE, {
        key: null,
        name: name,
        days_count: days_count,
        total_time: total_time,
        type: type,
        description: description
    });
}

// delete
export async function DeleteWorkoutPlan(key) {
    DeleteWithRelations(WORKOUT_PLANS_KEYS_STORE, key);
}

// select
export async function SelectAllWorkoutPlans(setWorkoutPlans) {
    return SelectAll(WORKOUT_PLANS_KEYS_STORE, setWorkoutPlans);
}