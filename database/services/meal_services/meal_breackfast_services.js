import AsyncStorage from '@react-native-async-storage/async-storage';
import { MEAL_BREACKFAST_STORE } from "../../database_stores";
import { MEAL_MAIN_SCHEMA } from '../../database_shemas';
import {
    setMealParameter,
    getMealParameter,
    addMealFood,
    removeMealFood
} from '../../general/meals_services';



// delete =====
export async function DeleteMealBreackfast() {
    await AsyncStorage.setItem(MEAL_BREACKFAST_STORE, JSON.stringify(MEAL_MAIN_SCHEMA));
}



// set meal =====
export async function SetMealBreackfast( 
    recommended_min, 
    recommended_max, 
    total_calories,
    total_carbs,
    total_protein,
    total_fat,
    foods ) {
    setMealParameter(MEAL_BREACKFAST_STORE, 0, {
        recommended_min: recommended_min,
        recommended_max: recommended_max,
        total_calories: total_calories,
        total_carbs: total_carbs,
        total_protein: total_protein,
        total_fat: total_fat,
        foods: foods
    });
}
// set meal recommended min calories
export async function SetMealBreackfastRecommendedMininumCalories(recommended_min) {
    return setMealParameter(MEAL_BREACKFAST_STORE, 1, recommended_min);
}
// set meal recommended max calories
export async function SetMealBreackfastRecommendedMaximumCalories(recommended_max) {
    return setMealParameter(MEAL_BREACKFAST_STORE, 2, recommended_max);
}
// set meal total calories
export async function SetMealBreackfastTotalCalories(total_calories) {
    return setMealParameter(MEAL_BREACKFAST_STORE, 3, total_calories);
}
// set meal total carbs
export async function SetMealBreackfastTotalCarbs(total_carbs) {
    return setMealParameter(MEAL_BREACKFAST_STORE, 4, total_carbs);
}
// set meal total protein
export async function SetMealBreackfastTotalProtein(total_protein) {
    return setMealParameter(MEAL_BREACKFAST_STORE, 5, total_protein);
}
// set meal total fat
export async function SetMealBreackfastTotalFat(total_fat) {
    return setMealParameter(MEAL_BREACKFAST_STORE, 6, total_fat);
}
// set meal foods
export async function SetMealBreackfastFoods(foods) {
    return setMealParameter(MEAL_BREACKFAST_STORE, 7, foods);
}



// get meal =====
export async function GetMealBreackfast(setMealBreackfast) {
    return getMealParameter(MEAL_BREACKFAST_STORE, 0, setMealBreackfast);
}
// get meal recommended max calories
export async function GetMealBreackfastRecommendedMininumCalories(setRecommendedMininumCalories) {
    return getMealParameter(MEAL_BREACKFAST_STORE, 1, setRecommendedMininumCalories);
}
// get meal recommended max calories
export async function GetMealBreackfastRecommendedMaximumCalories(setRecommendedMaximumCalories) {
    return getMealParameter(MEAL_BREACKFAST_STORE, 2, setRecommendedMaximumCalories);
}
// get meal total calories
export async function GetMealBreackfastTotalCalories(setTotalCalories) {
    return getMealParameter(MEAL_BREACKFAST_STORE, 3, setTotalCalories);
}
// get meal total carbs
export async function GetMealBreackfastTotalCarbs(setTotalCarbs) {
    return getMealParameter(MEAL_BREACKFAST_STORE, 4, setTotalCarbs);
}
// get meal total protein
export async function GetMealBreackfastTotalProtein(setTotalProtein) {
    return getMealParameter(MEAL_BREACKFAST_STORE, 5, setTotalProtein);
}
// get meal total fat
export async function GetMealBreackfastTotalFat(setTotalFat) {
    return getMealParameter(MEAL_BREACKFAST_STORE, 6, setTotalFat);
}
// get meal foods
export async function GetMealBreackfastFoods(setFoods) {
    return getMealParameter(MEAL_BREACKFAST_STORE, 7, setFoods);
}



// add food to meal =====
export async function AddFoodToMealBreackfast(
    food_name,
    food_calories,
    food_carbs,
    food_protein,
    food_fat
) {
    return addMealFood(
        MEAL_BREACKFAST_STORE, 
        food_name,
        food_calories,
        food_carbs,
        food_protein,
        food_fat
    );
}



// remove food from meal =====
export async function RemoveFoodFromMealBreackfast(food_key) {
    return removeMealFood( MEAL_BREACKFAST_STORE, food_key );
}
