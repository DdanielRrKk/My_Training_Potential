import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_MEALS_STORE } from "../../database_stores";
import { USER_MEALS_SHEMA } from '../../database_shemas';



async function setUserMealsParameter(param_number, parameter) {
    try {
        if(param_number == 0) { // add new user meals
            await AsyncStorage.setItem(USER_MEALS_STORE, JSON.stringify(parameter));
            return;
        }

        await AsyncStorage.getItem(USER_MEALS_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const user = JSON.parse(result);
            switch(param_number) {
                case 1: user.meal_goal = parameter; break; // add / update user meal goal (to lose, gain, maintain, ... weight)
                case 2: user.weight_goal = parameter; break; // add / update user weight goal to reach
                case 3: user.calories_goal = parameter; break; // add / update user calories goal for the day
                case 4: user.carbs_goal = parameter; break; // add / update user carbs goal for the day
                case 5: user.protein_goal = parameter; break; // add / update user protein goal for the day
                case 6: user.fat_goal = parameter; break; // add / update user fat goal for the day
                default: break;
            }
            await AsyncStorage.setItem(USER_MEALS_STORE, JSON.stringify(user));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

async function getUserMealsParameter(param_number, setParameter) {
    try {
        await AsyncStorage.getItem(USER_MEALS_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const user = JSON.parse(result);
            switch(param_number) {
                case 0: setParameter(user); break; // get user meals
                case 1: setParameter(user.meal_goal); break; // get user meal goal (to lose, gain, maintain, ... weight)
                case 2: setParameter(user.weight_goal); break; // get user weight goal to reach
                case 3: setParameter(user.calories_goal); break; // get user calories goal for the day
                case 4: setParameter(user.carbs_goal); break; // get user carbs goal for the day
                case 5: setParameter(user.protein_goal); break; // get user protein goal for the day
                case 6: setParameter(user.fat_goal); break; // get user fat goal for the day
                default: break;
            }
            return;
        });
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
    weight_goal, 
    calories_goal, 
    carbs_goal, 
    protein_goal, 
    fat_goal 
    ) {
    setUserMealsParameter(0, {
        meal_goal: meal_goal,
        weight_goal: weight_goal,
        calories_goal: calories_goal,
        carbs_goal: carbs_goal,
        protein_goal: protein_goal,
        fat_goal: fat_goal
    });
}
// set user meal goal (to lose, gain, maintain, ... weight)
export async function SetUserMealsGoal(meal_goal) {
    return setUserMealsParameter(1, meal_goal);
}
// set user weight goal to reach
export async function SetUserMealsWeightGoal(weight_goal) {
    return setUserMealsParameter(2, weight_goal);
}
// set user calories goal for the day
export async function SetUserMealsCaloriesGoal(calories_goal) {
    return setUserMealsParameter(3, calories_goal);
}
// set user carbs goal for the day
export async function SetUserMealsCarbsGoal(carbs_goal) {
    return setUserMealsParameter(4, carbs_goal);
}
// set user protein goal for the day
export async function SetUserMealsProteinGoal(protein_goal) {
    return setUserMealsParameter(5, protein_goal);
}
// set user fat goal for the day
export async function SetUserMealsFatGoal(fat_goal) {
    return setUserMealsParameter(6, fat_goal);
}



// get user meals =====
export async function GetUserMeals(setUserMeals) {
    return getUserMealsParameter(0, setUserMeals);
}
// get user meal goal (to lose, gain, maintain, ... weight)
export async function GetUserMealsGoal(setUserMealsGoal) {
    return getUserMealsParameter(1, setUserMealsGoal);
}
// get user weight goal to reach
export async function GetUserMealsWeightGoal(setUserMealsWeightGoal) {
    return getUserMealsParameter(2, setUserMealsWeightGoal);
}
// get user calories goal for the day
export async function GetUserMealsCaloriesGoal(setUserMealsCaloriesGoal) {
    return getUserMealsParameter(3, setUserMealsCaloriesGoal);
}
// get user carbs goal for the day
export async function GetUserMealsCarbsGoal(setUserMealsCarbsGoal) {
    return getUserMealsParameter(4, setUserMealsCarbsGoal);
}
// get user protein goal for the day
export async function GetUserMealsProteinGoal(setUserMealsProteinGoal) {
    return getUserMealsParameter(5, setUserMealsProteinGoal);
}
// get user fat goal for the day
export async function GetUserMealsFatGoal(setUserMealsFatGoal) {
    return getUserMealsParameter(6, setUserMealsFatGoal);
}