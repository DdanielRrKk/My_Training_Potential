import { MEAL_LUNCH_STORE } from "../../database_stores";
import { 
    InsertSingle,
    DeleteSingle,
    SelectSingle
} from "../../general/single_services";
import { AddFood, RemoveFood } from "../../general/meals_services";



// create
export async function CreateLunch(
    recommended_min,
    recommended_max
    ) 
    {
    InsertSingle(MEAL_LUNCH_STORE, {
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
export async function AddLunchFood(
    name,
    calories,
    carbs,
    protein,
    fat
    ) 
    {
    AddFood(MEAL_LUNCH_STORE, {
        name: name,
        calories: calories,
        carbs: carbs,
        protein: protein,
        fat: fat
    });
}

// remove food
export async function RemoveLunchFood( food_index ) {
    RemoveFood(MEAL_LUNCH_STORE, food_index);
}

// delete
export async function DropLunch() {
    DeleteSingle(MEAL_LUNCH_STORE);
}

// select
export async function SelectLunch(setLunch) {
    return SelectSingle(MEAL_LUNCH_STORE, setLunch);
}