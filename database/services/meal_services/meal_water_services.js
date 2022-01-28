import { MEAL_WATER_STORE } from "../../database_stores";
import { 
    InsertSingle,
    DeleteSingle,
    SelectSingle
} from "../../general/single_services";
import { AddWater, RemoveWater } from "../../general/meals_services";



// create
export async function CreateMealWater() {
    InsertSingle(MEAL_WATER_STORE, {
        mililiters: 0,
    });
}

// add water
export async function AddMealWater( mililiters ) {
    AddWater(MEAL_WATER_STORE, {
        mililiters: mililiters
    });
}

// remove water
export async function RemoveMealWater( mililiters ) {
    RemoveWater(MEAL_WATER_STORE, mililiters);
}

// delete
export async function DropWater() {
    DeleteSingle(MEAL_WATER_STORE);
}

// select
export async function SelectWater(setWater) {
    return SelectSingle(MEAL_WATER_STORE, setWater);
}