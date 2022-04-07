import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_FLAGS,
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



// setup meal goal screen
export async function SetMealGoal(goal) {
    // try {
    //     await AsyncStorage.setItem(USER_MEAL_GOAL, JSON.stringify(goal));
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        const userGoalsResult = await AsyncStorage.getItem(USER_GOALS);
        const userGoals = JSON.parse(userGoalsResult);
        // console.log('userGoals before', userGoals);

        userGoals.mealGoal = parseInt(goal);

        await AsyncStorage.setItem(USER_GOALS, JSON.stringify(userGoals));
    } catch (error) {
        console.log(error);
    }
}
export async function GetMealGoal() {
    // try {
    //     const result = await AsyncStorage.getItem(USER_MEAL_GOAL);
    //     return (IsResultEmpty(result)) ? console.log('user meal goal has no data') : JSON.parse(result);
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        const userGoalsResult = await AsyncStorage.getItem(USER_GOALS);
        const userGoals = JSON.parse(userGoalsResult);
        // console.log('userGoals', userGoals);
        return userGoals.mealGoal;
    } catch (error) {
        console.log(error);
    }
}

export async function SetActivityLevel(level) {
    // try {
    //     await AsyncStorage.setItem(USER_ACTIVITY_LEVEL, JSON.stringify(level));
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user before', user);
        user.activityLevel = parseInt(level);
        await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));
    } catch (error) {
        console.log(error);
    }
}
export async function GetActivityLevel() {
    // try {
    //     const result = await AsyncStorage.getItem(USER_ACTIVITY_LEVEL);
    //     return (IsResultEmpty(result)) ? console.log('user activity level has no data') : JSON.parse(result);
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user back', user);
        return user.activityLevel;
    } catch (error) {
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


        const systemFlagsResult = await AsyncStorage.getItem(SYSTEM_FLAGS);
        const systemFlags = JSON.parse(systemFlagsResult);
        systemFlags.isMealReady = true;
        console.log('systemFlags after', systemFlags);
        await AsyncStorage.setItem(SYSTEM_FLAGS, JSON.stringify(systemFlags));


        return {
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat
        }
    } catch (error) {
        console.log(error);
    }
}
