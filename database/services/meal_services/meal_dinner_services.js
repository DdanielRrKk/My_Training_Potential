import { MEAL_DINNER_STORE } from "../../database_stores";
import { 
    InsertSingle,
    DeleteSingle,
    SelectSingle
} from "../../general/single_services";
import { AddFood, RemoveFood } from "../../general/meals_services";



// create
export async function CreateDinner(
    recommended_min,
    recommended_max
    ) 
    {
    InsertSingle(MEAL_DINNER_STORE, {
        recommended_min: recommended_min,
        recommended_max: recommended_max,
        total_calories: 0,
        total_carbs: 0,
        total_protein: 0,
        total_fat: 0,
        foods: []
    });
}

// add food
export async function AddDinnerFood(
    name,
    calories,
    carbs,
    protein,
    fat
    ) 
    {
    AddFood(MEAL_DINNER_STORE, {
        name: name,
        calories: calories,
        carbs: carbs,
        protein: protein,
        fat: fat
    });
}

// remove food
export async function RemoveDinnerFood( food_index ) {
    RemoveFood(MEAL_DINNER_STORE, food_index);
}

// delete
export async function DropDinner() {
    DeleteSingle(MEAL_DINNER_STORE);
}

// select
export async function SelectDinner(setDinner) {
    return SelectSingle(MEAL_DINNER_STORE, setDinner);
}