import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_MEALS_STORE } from "../../database_stores";
import { USER_MEALS_SHEMA } from '../../database_shemas';



async function setUserMealsParameter(param_number, parameter) {
    try {
        const result = await AsyncStorage.getItem(USER_MEALS_STORE);
        if(result == null || result == '') return console.log('object has no data');

        if(param_number == 0) {
            await AsyncStorage.setItem(USER_MEALS_STORE, JSON.stringify(parameter));
            return;
        }

        const user = JSON.parse(result);
        switch(param_number) {
            case 1: user.meal_goal = parameter; break; 
            case 2: user.activity_level = parameter; break; 
            case 3: user.calories_goal = parameter; break; 
            case 4: user.carbs_goal = parameter; break; 
            case 5: user.protein_goal = parameter; break; 
            case 6: user.fat_goal = parameter; break; 
            default: break;
        }
        await AsyncStorage.setItem(USER_MEALS_STORE, JSON.stringify(user));
        return;
    } catch (error) {
        console.log(error);
    }
}

async function getUserMealsParameter(param_number) {
    try {
        const result = await AsyncStorage.getItem(USER_MEALS_STORE);
        if(result == null || result == '') return console.log('object has no data');

        const user = JSON.parse(result);
            if(param_number == 0) return user;
            if(param_number == 1) return user.meal_goal;
            if(param_number == 2) return user.activity_level;
            if(param_number == 3) return user.calories_goal;
            if(param_number == 4) return user.carbs_goal;
            if(param_number == 5) return user.protein_goal;
            if(param_number == 6) return user.fat_goal;
            return console.log('not found');
    } catch (error) {
        console.log(error);
    }
}



export async function SetUserMealsNutritions(calories, carbs, protein, fat) {
    try {
        const result = await AsyncStorage.getItem(USER_MEALS_STORE);
        if(result == null || result == '') return console.log('object has no data');

        const user = JSON.parse(result);
        user.calories_goal = calories;
        user.carbs_goal = carbs;
        user.protein_goal = protein;
        user.fat_goal = fat;
        await AsyncStorage.setItem(USER_MEALS_STORE, JSON.stringify(user));
        return;
    } catch (error) {
        console.log(error);
    }
}

export async function GetUserMealsNutritions() {
    try {
        const result = await AsyncStorage.getItem(USER_MEALS_STORE);
        if(result == null || result == '') return console.log('object has no data');

        const user = JSON.parse(result);
        return {
            calories: user.calories_goal,
            carbs: user.carbs_goal,
            protein: user.protein_goal,
            fat: user.fat_goal
        }
    } catch (error) {
        console.log(error);
    }
}



// delete =====
export async function DeleteUserMeals() {
    await AsyncStorage.setItem(USER_MEALS_STORE, JSON.stringify(USER_MEALS_SHEMA));
}



// set user meals =====
export async function SetUserMeals( 
    meal_goal, 
    activity_level,
    calories_goal, 
    carbs_goal, 
    protein_goal, 
    fat_goal
    ) {
    setUserMealsParameter(0, {
        meal_goal: meal_goal,
        activity_level: activity_level,
        calories_goal: calories_goal,
        carbs_goal: carbs_goal,
        protein_goal: protein_goal,
        fat_goal: fat_goal
    });
}
export async function SetUserMealsGoal(meal_goal) {
    return setUserMealsParameter(1, meal_goal);
}
export async function SetUserMealsActivityLevel(activity_level) {
    return setUserMealsParameter(2, activity_level);
}
export async function SetUserMealsCaloriesGoal(calories_goal) {
    return setUserMealsParameter(3, calories_goal);
}
export async function SetUserMealsCarbsGoal(carbs_goal) {
    return setUserMealsParameter(4, carbs_goal);
}
export async function SetUserMealsProteinGoal(protein_goal) {
    return setUserMealsParameter(5, protein_goal);
}
export async function SetUserMealsFatGoal(fat_goal) {
    return setUserMealsParameter(6, fat_goal);
}



// get user meals =====
export async function GetUserMeals() {
    return getUserMealsParameter(0);
}
export async function GetUserMealsGoal() {
    return getUserMealsParameter(1);
}
export async function GetUserMealsActivityLevel() {
    return getUserMealsParameter(2);
}
export async function GetUserMealsCaloriesGoal() {
    return getUserMealsParameter(3);
}
export async function GetUserMealsCarbsGoal() {
    return getUserMealsParameter(4);
}
export async function GetUserMealsProteinGoal() {
    return getUserMealsParameter(5);
}
export async function GetUserMealsFatGoal() {
    return getUserMealsParameter(6);
}
