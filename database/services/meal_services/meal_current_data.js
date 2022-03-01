import AsyncStorage from '@react-native-async-storage/async-storage';
import { MEAL_CURRENT_DATA_STORE } from "../../database_stores";
import { MEAL_CURRENT_DATA_SCHEMA } from '../../database_shemas';



// delete =====
export async function DeleteMealCurrentData() {
    await AsyncStorage.setItem(MEAL_CURRENT_DATA_STORE, JSON.stringify(MEAL_CURRENT_DATA_SCHEMA));
}



async function setMealCurrentDataParameter(param_number, parameter) {
    try {
        if(param_number == 0) { 
            await AsyncStorage.setItem(MEAL_CURRENT_DATA_STORE, JSON.stringify(parameter));
            return;
        }

        await AsyncStorage.getItem(MEAL_CURRENT_DATA_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const meal = JSON.parse(result);
            switch(param_number) {
                case 1: meal.water = parameter; break;
                case 2: meal.calories = parameter; break;           
                case 3: meal.carbs = parameter; break;
                case 4: meal.protein = parameter; break;
                case 5: meal.fat = parameter; break;
                case 6: meal.breakfast_cal = parameter; break;
                case 7: meal.lunch_cal = parameter; break;
                case 8: meal.dinner_cal = parameter; break;
                default: break;
            }
            await AsyncStorage.setItem(MEAL_CURRENT_DATA_STORE, JSON.stringify(meal));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

async function getMealCurrentDataParameter(param_number, setParameter) {
    try {
        await AsyncStorage.getItem(MEAL_CURRENT_DATA_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const meal = JSON.parse(result);
            switch(param_number) {
                case 0: setParameter(meal); break;
                case 1: setParameter(meal.water); break;
                case 2: setParameter(meal.calories); break;
                case 3: setParameter(meal.carbs); break;
                case 4: setParameter(meal.protein); break;
                case 5: setParameter(meal.fat); break;
                case 6: setParameter(meal.breakfast_cal); break;
                case 7: setParameter(meal.lunch_cal); break;
                case 8: setParameter(meal.dinner_cal); break;
                default: break;
            }
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// set meal current data =====
export async function SetMealCurrentData( 
    water,
    calories,
    carbs,
    protein,
    fat,
    breakfast_cal,
    lunch_cal,
    dinner_cal
    ) {
        setMealCurrentDataParameter(0, {
            water: water,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat,
            breakfast_cal: breakfast_cal,
            lunch_cal: lunch_cal,
            dinner_cal: dinner_cal,
    });
}
export async function SetMealCurrentWater(water) {
    return setMealCurrentDataParameter(1, water);
}
export async function SetMealCurrentCalories(calories) {
    return setMealCurrentDataParameter(2, calories);
}
export async function SetMealCurrentCarbs(carbs) {
    return setMealCurrentDataParameter(3, carbs);
}
export async function SetMealCurrentProtein(protein) {
    return setMealCurrentDataParameter(4, protein);
}
export async function SetMealCurrentFat(fat) {
    return setMealCurrentDataParameter(5, fat);
}
export async function SetMealCurrentBreakfastCalories(breakfast_cal) {
    return setMealCurrentDataParameter(6, breakfast_cal);
}
export async function SetMealCurrentLunchCalories(lunch_cal) {
    return setMealCurrentDataParameter(7, lunch_cal);
}
export async function SetMealCurrentDinnerCalories(dinner_cal) {
    return setMealCurrentDataParameter(8, dinner_cal);
}



// get meal current data =====
export async function GetMealCurrentData(setMealCurrentData) {
    return getMealCurrentDataParameter(0, setMealCurrentData);
}
export async function GetMealCurrentWater(setMealCurrentWater) {
    return getMealCurrentDataParameter(1, setMealCurrentWater);
}
export async function GetMealCurrentCalories(setMealCurrentCalories) {
    return getMealCurrentDataParameter(2, setMealCurrentCalories);
}
export async function GetMealCurrentCarbs(setMealCurrentCarbs) {
    return getMealCurrentDataParameter(3, setMealCurrentCarbs);
}
export async function GetMealCurrentProtein(setMealCurrentProtein) {
    return getMealCurrentDataParameter(4, setMealCurrentProtein);
}
export async function GetMealCurrentFat(setMealCurrentFat) {
    return getMealCurrentDataParameter(5, setMealCurrentFat);
}
export async function GetMealCurrentBreakfastCalories(setMealCurrentBreakfastCalories) {
    return getMealCurrentDataParameter(6, setMealCurrentBreakfastCalories);
}
export async function GetMealCurrentLunchCalories(setMealCurrentLunchCalories) {
    return getMealCurrentDataParameter(7, setMealCurrentLunchCalories);
}
export async function GetMealCurrentDinnerCalories(setMealCurrentDinnerCalories) {
    return getMealCurrentDataParameter(8, setMealCurrentDinnerCalories);
}
