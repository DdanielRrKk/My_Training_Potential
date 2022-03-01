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
export async function SetMealBreackfastRecommendedMininumCalories(recommended_min) {
    return setMealParameter(MEAL_BREACKFAST_STORE, 1, recommended_min);
}
export async function SetMealBreackfastRecommendedMaximumCalories(recommended_max) {
    return setMealParameter(MEAL_BREACKFAST_STORE, 2, recommended_max);
}
export async function SetMealBreackfastTotalCalories(total_calories) {
    return setMealParameter(MEAL_BREACKFAST_STORE, 3, total_calories);
}
export async function SetMealBreackfastTotalCarbs(total_carbs) {
    return setMealParameter(MEAL_BREACKFAST_STORE, 4, total_carbs);
}
export async function SetMealBreackfastTotalProtein(total_protein) {
    return setMealParameter(MEAL_BREACKFAST_STORE, 5, total_protein);
}
export async function SetMealBreackfastTotalFat(total_fat) {
    return setMealParameter(MEAL_BREACKFAST_STORE, 6, total_fat);
}
export async function SetMealBreackfastFoods(foods) {
    return setMealParameter(MEAL_BREACKFAST_STORE, 7, foods);
}



// get meal =====
export async function GetMealBreackfast() {
    return getMealParameter(MEAL_BREACKFAST_STORE, 0);
}
export async function GetMealBreackfastRecommendedMininumCalories() {
    return getMealParameter(MEAL_BREACKFAST_STORE, 1);
}
export async function GetMealBreackfastRecommendedMaximumCalories() {
    return getMealParameter(MEAL_BREACKFAST_STORE, 2);
}
export async function GetMealBreackfastTotalCalories() {
    return getMealParameter(MEAL_BREACKFAST_STORE, 3);
}
export async function GetMealBreackfastTotalCarbs() {
    return getMealParameter(MEAL_BREACKFAST_STORE, 4);
}
export async function GetMealBreackfastTotalProtein() {
    return getMealParameter(MEAL_BREACKFAST_STORE, 5);
}
export async function GetMealBreackfastTotalFat() {
    return getMealParameter(MEAL_BREACKFAST_STORE, 6);
}
export async function GetMealBreackfastFoods() {
    return getMealParameter(MEAL_BREACKFAST_STORE, 7);
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
