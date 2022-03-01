import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    MEAL_BREAKFAST_STORE,
    MEAL_DINNER_STORE,
    MEAL_LUNCH_STORE
} from '../../database_stores';



export function addition(textValue, numberValue) {
    if(textValue == null || textValue == '' || textValue == undefined || textValue == 'NaN') return numberValue;
    return (parseInt(textValue) + numberValue);
}

export function subtraction(textValue, numberValue) {
    if(textValue == null || textValue == '' || textValue == undefined || textValue == 'NaN') return numberValue;
    return (parseInt(textValue) - numberValue);
}

export async function AddMealFood(
    meal_store_number, 
    food_name, 
    food_calories, 
    food_carbs, 
    food_protein, 
    food_fat
    ) {
    try {
        let result = null;
        if(meal_store_number == 1) result = await AsyncStorage.getItem(MEAL_BREAKFAST_STORE);
        if(meal_store_number == 2) result = await AsyncStorage.getItem(MEAL_DINNER_STORE);
        if(meal_store_number == 3) result = await AsyncStorage.getItem(MEAL_LUNCH_STORE);
        if(result == null || result == '') return console.log('object has no data');

        const meal = JSON.parse(result);
        meal.total_calories = addition(meal.total_calories, food_calories);
        meal.total_carbs = addition(meal.total_carbs, food_carbs);
        meal.total_protein = addition(meal.total_protein, food_protein);
        meal.total_fat = addition(meal.total_fat, food_fat);

        if(meal.foods.length == 0) {
            meal.foods.push({
                key: 1,
                name: food_name,
                calories: food_calories,
                carbs: food_carbs,
                protein: food_protein,
                fat: food_fat
            });
        }
        else {
            const lastFoodKey = parseInt(meal.foods[meal.foods.length - 1].key);
            meal.foods.push({
                key: lastFoodKey + 1,
                name: food_name,
                calories: food_calories,
                carbs: food_carbs,
                protein: food_protein,
                fat: food_fat
            });
        }

        if(meal_store_number == 1) await AsyncStorage.setItem(MEAL_BREAKFAST_STORE, JSON.stringify(meal));
        if(meal_store_number == 2) await AsyncStorage.setItem(MEAL_DINNER_STORE, JSON.stringify(meal));
        if(meal_store_number == 3) await AsyncStorage.setItem(MEAL_LUNCH_STORE, JSON.stringify(meal));
        return;
    } catch (error) {
        console.log(error);
    }
}

export async function RemoveMealFood(meal_store_number, food_key) {
    try {
        let result = null;
        if(meal_store_number == 1) result = await AsyncStorage.getItem(MEAL_BREAKFAST_STORE);
        if(meal_store_number == 2) result = await AsyncStorage.getItem(MEAL_DINNER_STORE);
        if(meal_store_number == 3) result = await AsyncStorage.getItem(MEAL_LUNCH_STORE);
        if(result == null || result == '') return console.log('object has no data');

        const meal = JSON.parse(result);
        let foodIndex = undefined;

        meal.foods.find((food, index) => {
            if(food.key == food_key) {
                meal.total_calories = subtraction(meal.total_calories, food.calories);
                meal.total_carbs = subtraction(meal.total_carbs, food.carbs);
                meal.total_protein = subtraction(meal.total_protein, food.protein); 
                meal.total_fat = subtraction(meal.total_fat, food.fat); 

                foodIndex = index;
                return true;
            }
        });
        if(foodIndex == undefined) return; // object not found

        meal.foods.splice(foodIndex, 1);

        if(meal_store_number == 1) await AsyncStorage.setItem(MEAL_BREAKFAST_STORE, JSON.stringify(meal));
        if(meal_store_number == 2) await AsyncStorage.setItem(MEAL_DINNER_STORE, JSON.stringify(meal));
        if(meal_store_number == 3) await AsyncStorage.setItem(MEAL_LUNCH_STORE, JSON.stringify(meal));
        return;
    } catch (error) {
        console.log(error);
    }
}