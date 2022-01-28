import { WORKOUT_EXERCISES_STORE } from "../../database_stores";
import { 
    Insert,
    Update,
    Delete,
    SelectRelations
} from "../../general/database";



// insert
export async function InsertWorkoutExercise( 
    relational_key,
    name,
    image_64base,
    type,
    sets,
    rest,
    reps_min,
    reps_max,
    duration,
    is_until_failure
    ) 
    {
    Insert(WORKOUT_EXERCISES_STORE, {
        key: null,
        relational_key: relational_key,
        name: name,
        image_64base: image_64base,
        type: type,
        sets: sets,
        rest: rest,
        reps_min: reps_min,
        reps_max: reps_max,
        duration: duration,
        is_until_failure: is_until_failure
    });
}

// update
export async function UpdateWorkoutExercise( 
    key,
    name = null,
    image_64base = null,
    type = null,
    sets = null,
    rest = null,
    reps_min = null,
    reps_max = null,
    duration = null,
    is_until_failure = null
    ) 
    {
    Update(WORKOUT_EXERCISES_STORE, {
        key: key,
        name: name,
        image_64base: image_64base,
        type: type,
        sets: sets,
        rest: rest,
        reps_min: reps_min,
        reps_max: reps_max,
        duration: duration,
        is_until_failure: is_until_failure
    });
}

// delete
export async function DeleteWorkoutExericse(key) {
    Delete(WORKOUT_EXERCISES_STORE, key);
}

// select
export async function SelectWorkoutExercise(relational_key, setWorkoutExercise) {
    return SelectRelations(WORKOUT_EXERCISES_STORE, relational_key, setWorkoutExercise);
}