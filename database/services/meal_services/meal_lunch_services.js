import AsyncStorage from '@react-native-async-storage/async-storage';
import { MEAL_LUNCH_STORE } from "../../database_stores";
import { MEAL_MAIN_SCHEMA } from '../../database_shemas';
import {
    setMealParameter,
    getMealParameter,
    addMealFood,
    removeMealFood
} from '../../general/meals_services';



// delete =====
export async function DeleteMealLunch() {
    await AsyncStorage.setItem(MEAL_LUNCH_STORE, JSON.stringify(MEAL_MAIN_SCHEMA));
}



// set meal =====
export async function SetMealLunch( 
    recommended_min, 
    recommended_max, 
    total_calories,
    total_carbs,
    total_protein,
    total_fat,
    foods ) {
    setMealParameter(MEAL_LUNCH_STORE, 0, {
        recommended_min: recommended_min,
        recommended_max: recommended_max,
        total_calories: total_calories,
        total_carbs: total_carbs,
        total_protein: total_protein,
        total_fat: total_fat,
        foods: foods
    });
}
export async function SetMealLunchRecommendedMininumCalories(recommended_min) {
    return setMealParameter(MEAL_LUNCH_STORE, 1, recommended_min);
}
export async function SetMealLunchRecommendedMaximumCalories(recommended_max) {
    return setMealParameter(MEAL_LUNCH_STORE, 2, recommended_max);
}
export async function SetMealLunchTotalCalories(total_calories) {
    return setMealParameter(MEAL_LUNCH_STORE, 3, total_calories);
}
export async function SetMealLunchTotalCarbs(total_carbs) {
    return setMealParameter(MEAL_LUNCH_STORE, 4, total_carbs);
}
export async function SetMealLunchTotalProtein(total_protein) {
    return setMealParameter(MEAL_LUNCH_STORE, 5, total_protein);
}
export async function SetMealLunchTotalFat(total_fat) {
    return setMealParameter(MEAL_LUNCH_STORE, 6, total_fat);
}
export async function SetMealLunchFoods(foods) {
    return setMealParameter(MEAL_LUNCH_STORE, 7, foods);
}



// get meal =====
export async function GetMealLunch() {
    return getMealParameter(MEAL_LUNCH_STORE, 0);
}
export async function GetMealLunchRecommendedMininumCalories() {
    return getMealParameter(MEAL_LUNCH_STORE, 1);
}
export async function GetMealLunchRecommendedMaximumCalories() {
    return getMealParameter(MEAL_LUNCH_STORE, 2);
}
export async function GetMealLunchTotalCalories() {
    return getMealParameter(MEAL_LUNCH_STORE, 3);
}
export async function GetMealLunchTotalCarbs() {
    return getMealParameter(MEAL_LUNCH_STORE, 4);
}
export async function GetMealLunchTotalProtein() {
    return getMealParameter(MEAL_LUNCH_STORE, 5);
}
export async function GetMealLunchTotalFat() {
    return getMealParameter(MEAL_LUNCH_STORE, 6);
}
export async function GetMealLunchFoods() {
    return getMealParameter(MEAL_LUNCH_STORE, 7);
}


// add food to meal =====
export async function AddFoodToMealLunch(
    food_name,
    food_calories,
    food_carbs,
    food_protein,
    food_fat
) {
    return addMealFood(
        MEAL_LUNCH_STORE, 
        food_name,
        food_calories,
        food_carbs,
        food_protein,
        food_fat
    );
}



// remove food from meal =====
export async function RemoveFoodFromMealLunch(food_key) {
    return removeMealFood( MEAL_LUNCH_STORE, food_key );
}