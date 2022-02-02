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
// set meal recommended min calories
export async function SetMealLunchRecommendedMininumCalories(recommended_min) {
    return setMealParameter(MEAL_LUNCH_STORE, 1, recommended_min);
}
// set meal recommended max calories
export async function SetMealLunchRecommendedMaximumCalories(recommended_max) {
    return setMealParameter(MEAL_LUNCH_STORE, 2, recommended_max);
}
// set meal total calories
export async function SetMealLunchTotalCalories(total_calories) {
    return setMealParameter(MEAL_LUNCH_STORE, 3, total_calories);
}
// set meal total carbs
export async function SetMealLunchTotalCarbs(total_carbs) {
    return setMealParameter(MEAL_LUNCH_STORE, 4, total_carbs);
}
// set meal total protein
export async function SetMealLunchTotalProtein(total_protein) {
    return setMealParameter(MEAL_LUNCH_STORE, 5, total_protein);
}
// set meal total fat
export async function SetMealLunchTotalFat(total_fat) {
    return setMealParameter(MEAL_LUNCH_STORE, 6, total_fat);
}
// set meal foods
export async function SetMealLunchFoods(foods) {
    return setMealParameter(MEAL_LUNCH_STORE, 7, foods);
}



// get meal =====
export async function GetMealLunch(setMealDinner) {
    return getMealParameter(MEAL_LUNCH_STORE, 0, setMealDinner);
}
// get meal recommended max calories
export async function GetMealLunchRecommendedMininumCalories(setRecommendedMininumCalories) {
    return getMealParameter(MEAL_LUNCH_STORE, 1, setRecommendedMininumCalories);
}
// get meal recommended max calories
export async function GetMealLunchRecommendedMaximumCalories(setRecommendedMaximumCalories) {
    return getMealParameter(MEAL_LUNCH_STORE, 2, setRecommendedMaximumCalories);
}
// get meal total calories
export async function GetMealLunchTotalCalories(setTotalCalories) {
    return getMealParameter(MEAL_LUNCH_STORE, 3, setTotalCalories);
}
// get meal total carbs
export async function GetMealLunchTotalCarbs(setTotalCarbs) {
    return getMealParameter(MEAL_LUNCH_STORE, 4, setTotalCarbs);
}
// get meal total protein
export async function GetMealLunchTotalProtein(setTotalProtein) {
    return getMealParameter(MEAL_LUNCH_STORE, 5, setTotalProtein);
}
// get meal total fat
export async function GetMealLunchTotalFat(setTotalFat) {
    return getMealParameter(MEAL_LUNCH_STORE, 6, setTotalFat);
}
// get meal foods
export async function GetMealLunchFoods(setFoods) {
    return getMealParameter(MEAL_LUNCH_STORE, 7, setFoods);
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
