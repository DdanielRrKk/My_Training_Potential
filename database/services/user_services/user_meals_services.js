import { USER_MEALS_STORE } from "../../database_stores";
import { 
    InsertSingle,
    UpdateSingle,
    DeleteSingle,
    SelectSingle
} from "../../general/single_services";



// insert
export async function InsertUserMeals(
    meal_goal,
    weight_goal, 
    calories_goal,
    carbs_goal,
    protein_goal,
    fat_goal
    ) 
    {
    InsertSingle(USER_MEALS_STORE, {
        meal_goal: meal_goal,
        weight_goal: weight_goal,
        calories_goal: calories_goal,
        carbs_goal: carbs_goal,
        protein_goal: protein_goal,
        fat_goal: fat_goal
    });
}

// update
export async function UpdateUserMeals(
    meal_goal = null, 
    weight_goal = null, 
    calories_goal = null,
    carbs_goal = null,
    protein_goal = null,
    fat_goal = null
    ) 
    {
    UpdateSingle(USER_MEALS_STORE, {
        meal_goal: meal_goal,
        weight_goal: weight_goal,
        calories_goal: calories_goal,
        carbs_goal: carbs_goal,
        protein_goal: protein_goal,
        fat_goal: fat_goal
    });
}

// delete
export async function DeleteUserMeals() {
    DeleteSingle(USER_MEALS_STORE);
}

// select
export async function SelectUserMeals(setUserMeals) {
    return SelectSingle(USER_MEALS_STORE, setUserMeals);
}