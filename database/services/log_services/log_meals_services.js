import { LOG_MEALS_STORE } from "../../database_stores";
import { 
    Insert,
    Delete,
    SelectAll
} from "../../general/database";



// insert
export async function InsertLogMeal( 
    water,
    calories,
    carbs,
    protein,
    fat,
    breackfast_calories,
    lunch_calories,
    dinner_calories
    ) 
    {
    const today = new Date();
    const recordedDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    Insert(LOG_MEALS_STORE, {
        key: null,
        water: water,
        calories: calories,
        carbs: carbs,
        protein: protein,
        fat: fat,
        breackfast_calories: breackfast_calories,
        lunch_calories: lunch_calories,
        dinner_calories: dinner_calories,
        date: recordedDate
    });
}

// delete
export async function DeleteLogMeal(key) {
    Delete(LOG_MEALS_STORE, key);
}

// select
export async function SelectAllLogMeals(setLogMeals) {
    return SelectAll(LOG_MEALS_STORE, setLogMeals);
}