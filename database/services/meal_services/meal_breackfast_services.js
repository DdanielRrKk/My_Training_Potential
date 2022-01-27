import { MEAL_BREACKFAST_STORE } from "../../database_stores";
import { 
    InsertSingle,
    DeleteSingle,
    SelectSingle
} from "../../general/single_services";
import { AddFood, RemoveFood } from "../../general/meals_services";



// create
export async function CreateBreackfast(
    recommended_min,
    recommended_max
    ) 
    {
    InsertSingle(MEAL_BREACKFAST_STORE, {
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
export async function AddBreackfastFood(
    name,
    calories,
    carbs,
    protein,
    fat
    ) 
    {
    AddFood(MEAL_BREACKFAST_STORE, {
        name: name,
        calories: calories,
        carbs: carbs,
        protein: protein,
        fat: fat
    });
}

// remove food
export async function RemoveBreackfastFood( food_index ) {
    RemoveFood(MEAL_BREACKFAST_STORE, food_index);
}

// delete
export async function DropBreackfast() {
    DeleteSingle(MEAL_BREACKFAST_STORE);
}

// select
export async function SelectBreackfast(setBreackfast) {
    return SelectSingle(MEAL_BREACKFAST_STORE, setBreackfast);
}