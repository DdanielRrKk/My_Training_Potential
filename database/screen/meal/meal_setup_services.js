import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_FLAGS,
    SYSTEM_STATE,
    USER_INFO,
    USER_GOALS,
    MEAL_BREAKFAST,
    MEAL_LUNCH,
    MEAL_DINNER,
    MEAL_LOG
} from '../../database_stores';
import {
    calculateCalories,
    calculateCarbs,
    calculateProtein,
    calculateFat,
    calculateRecommendedCalories
} from '../../../helpers/mealCalculations';
import { getCurrentDateString, getCurrentDateForLog } from '../../../helpers/dateHelper';
import { 
    SYSTEM_USER_SETUP,
    SYSTEM_USER_AND_MEAL_SETUP,
    SYSTEM_USER_AND_WORKOUT_SETUP,
    SYSTEM_ALL_SETUP 
} from '../../../helpers/constants';



// setup meal goal screen
export async function SetMealGoal(goal) {
    try {
        const userGoalsResult = await AsyncStorage.getItem(USER_GOALS);
        const userGoals = JSON.parse(userGoalsResult);
        // console.log('userGoals before', userGoals);

        userGoals.mealGoal = parseInt(goal);

        await AsyncStorage.setItem(USER_GOALS, JSON.stringify(userGoals));
    } catch (error) {
        console.log('SetMealGoal error');
        console.log(error);
    }
}
export async function GetMealGoal() {
    try {
        const userGoalsResult = await AsyncStorage.getItem(USER_GOALS);
        const userGoals = JSON.parse(userGoalsResult);
        // console.log('userGoals', userGoals);
        return userGoals.mealGoal;
    } catch (error) {
        console.log('GetMealGoal error');
        console.log(error);
    }
}

export async function SetActivityLevel(level) {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user before', user);
        user.activityLevel = parseInt(level);
        await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));
    } catch (error) {
        console.log('SetActivityLevel error');
        console.log(error);
    }
}
export async function GetActivityLevel() {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user back', user);
        return user.activityLevel;
    } catch (error) {
        console.log('GetActivityLevel error');
        console.log(error);
    }
}


export async function SetAndGetMealResults() {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user back', user);

        const userGoalsResult = await AsyncStorage.getItem(USER_GOALS);
        const userGoals = JSON.parse(userGoalsResult);
        // console.log('userGoals', userGoals);

        const calories = parseInt(calculateCalories(user.weight, user.height, user.age, user.gender, user.activityLevel, userGoals.mealGoal));
        const carbs = parseInt(calculateCarbs(user.weight, user.height, user.age, user.gender, user.activityLevel, userGoals.mealGoal));
        const protein = parseInt(calculateProtein(user.weight, user.height, user.age, user.gender, user.activityLevel, userGoals.mealGoal));
        const fat = parseInt(calculateFat(user.weight, user.height, user.age, user.gender, user.activityLevel, userGoals.mealGoal));

        // console.log('calories', calories);
        // console.log('carbs', carbs);
        // console.log('protein', protein);
        // console.log('fat', fat);

        userGoals.caloriesGoal = calories;
        userGoals.carbsGoal = carbs;
        userGoals.proteinGoal = protein;
        userGoals.fatGoal = fat;
        console.log('userGoals after', userGoals);
        await AsyncStorage.setItem(USER_GOALS, JSON.stringify(userGoals));


        const currentDate = getCurrentDateForLog();
        const dateString = getCurrentDateString();
        const log = [{
            key: 1,
            water: 0,
            totalCalories: 0,
            totalCarbs: 0,
            totalProtein: 0,
            totalFat: 0,
            caloriesGoal: calories,
            carbsGoal: carbs,
            proteinGoal: protein,
            fatGoal: fat,
            date: currentDate,
            dateString: dateString
        }];
        console.log('mealLog after', log);
        await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(log));


        const breakfastResult = await AsyncStorage.getItem(MEAL_BREAKFAST);
        const breakfast = JSON.parse(breakfastResult);
        // console.log('breakfast', breakfast);

        const lunchResult = await AsyncStorage.getItem(MEAL_LUNCH);
        const lunch = JSON.parse(lunchResult);
        // console.log('lunch', lunch);

        const dinnerResult = await AsyncStorage.getItem(MEAL_DINNER);
        const dinner = JSON.parse(dinnerResult);
        // console.log('dinner', dinner);

        const {
            breakfastRecommendedMin,
            breakfastRecommendedMax,
            lunchRecommendedMin,
            lunchRecommendedMax,
            dinnerRecommendedMin,
            dinnerRecommendedMax,
        } = calculateRecommendedCalories(calories);

        breakfast.recommendedMin = breakfastRecommendedMin;
        breakfast.recommendedMax = breakfastRecommendedMax;
        lunch.recommendedMin = lunchRecommendedMin;
        lunch.recommendedMax = lunchRecommendedMax;
        dinner.recommendedMin = dinnerRecommendedMin;
        dinner.recommendedMax = dinnerRecommendedMax;

        console.log('breakfast after', breakfast);
        console.log('lunch after', lunch);
        console.log('dinner after', dinner);
        await AsyncStorage.setItem(MEAL_BREAKFAST, JSON.stringify(breakfast));
        await AsyncStorage.setItem(MEAL_LUNCH, JSON.stringify(lunch));
        await AsyncStorage.setItem(MEAL_DINNER, JSON.stringify(dinner));


        const systemStateResult = await AsyncStorage.getItem(SYSTEM_STATE);
        switch(parseInt(systemStateResult)) {
            case SYSTEM_USER_SETUP: await AsyncStorage.setItem(SYSTEM_STATE, JSON.stringify(SYSTEM_USER_AND_MEAL_SETUP)); break;
            case SYSTEM_USER_AND_WORKOUT_SETUP: await AsyncStorage.setItem(SYSTEM_STATE, JSON.stringify(SYSTEM_ALL_SETUP)); break;
            default: break;
        }


        return {
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat
        }
    } catch (error) {
        console.log('SetAndGetMealResults error');
        console.log(error);
    }
}
