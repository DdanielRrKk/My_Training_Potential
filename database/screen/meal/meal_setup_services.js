import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_IS_MEAL_SETUP,
    USER_AGE,
    USER_WEIGHT,
    USER_HEIGHT,
    USER_GENDER,
    USER_MEAL_GOAL,
    USER_ACTIVITY_LEVEL,
    USER_CALORIES_GOAL,
    USER_CARBS_GOAL,
    USER_PROTEIN_GOAL,
    USER_FAT_GOAL,
    MEAL_BREAKFAST_RECOMMENDED_MIN,
    MEAL_BREAKFAST_RECOMMENDED_MAX,
    MEAL_LUNCH_RECOMMENDED_MIN,
    MEAL_LUNCH_RECOMMENDED_MAX,
    MEAL_DINNER_RECOMMENDED_MIN,
    MEAL_DINNER_RECOMMENDED_MAX,
} from '../../database_stores';
import { IsResultEmpty } from '../../../helpers/databaseValidations';
import {
    calculateCalories,
    calculateCarbs,
    calculateProtein,
    calculateFat,
    calculateRecommendedCalories
} from '../../../helpers/mealCalculations';



// setup meal goal screen
export async function SetMealGoal(goal) {
    try {
        await AsyncStorage.setItem(USER_MEAL_GOAL, JSON.stringify(goal));
    } catch (error) {
        console.log(error);
    }
}
export async function GetMealGoal() {
    try {
        const result = await AsyncStorage.getItem(USER_MEAL_GOAL);
        return (IsResultEmpty(result)) ? console.log('user meal goal has no data') : JSON.parse(result);
    } catch (error) {
        console.log(error);
    }
}

export async function SetActivityLevel(level) {
    try {
        await AsyncStorage.setItem(USER_ACTIVITY_LEVEL, JSON.stringify(level));
    } catch (error) {
        console.log(error);
    }
}
export async function GetActivityLevel() {
    try {
        const result = await AsyncStorage.getItem(USER_ACTIVITY_LEVEL);
        return (IsResultEmpty(result)) ? console.log('user activity level has no data') : JSON.parse(result);
    } catch (error) {
        console.log(error);
    }
}


export async function SetAndGetMealResults() {
    try {
        const ageResult = await AsyncStorage.getItem(USER_AGE);
        // console.log('ageResult', ageResult);
        if(IsResultEmpty(ageResult)) return console.log('user age has no data'); 

        const weightResult = await AsyncStorage.getItem(USER_WEIGHT);
        // console.log('weightResult', weightResult);
        if(IsResultEmpty(weightResult)) return console.log('user weight has no data'); 
        
        const heightResult = await AsyncStorage.getItem(USER_HEIGHT);
        // console.log('heightResult', heightResult);
        if(IsResultEmpty(heightResult)) return console.log('user height has no data'); 

        const genderResult = await AsyncStorage.getItem(USER_GENDER);
        // console.log('genderResult', genderResult);
        if(IsResultEmpty(genderResult)) return console.log('user gender has no data'); 

        const activityLevelResult = await AsyncStorage.getItem(USER_ACTIVITY_LEVEL);
        // console.log('activityLevelResult', activityLevelResult);
        if(IsResultEmpty(activityLevelResult)) return console.log('user activity level has no data'); 

        const mealGoalResult = await AsyncStorage.getItem(USER_MEAL_GOAL);
        // console.log('mealGoalResult', mealGoalResult);
        if(IsResultEmpty(mealGoalResult)) return console.log('user meal goal has no data'); 


        // store has data
        const age = parseInt(JSON.parse(ageResult));
        const weight = parseInt(JSON.parse(weightResult));
        const height = parseInt(JSON.parse(heightResult));
        const gender = parseInt(JSON.parse(genderResult));
        const activityLevel = parseInt(JSON.parse(activityLevelResult));
        const mealGoal = parseInt(JSON.parse(mealGoalResult));

        // console.log('age', age);
        // console.log('weight', weight);
        // console.log('height', height);
        // console.log('gender', gender);
        // console.log('activityLevel', activityLevel);
        // console.log('mealGoal', mealGoal);


        const calories = parseInt(calculateCalories(weight, height, age, gender, activityLevel, mealGoal));
        const carbs = parseInt(calculateCarbs(weight, height, age, gender, activityLevel, mealGoal));
        const protein = parseInt(calculateProtein(weight, height, age, gender, activityLevel, mealGoal));
        const fat = parseInt(calculateFat(weight, height, age, gender, activityLevel, mealGoal));

        // console.log('calories', calories);
        // console.log('carbs', carbs);
        // console.log('protein', protein);
        // console.log('fat', fat);


        const {
            breakfastRecommendedMin,
            breakfastRecommendedMax,
            lunchRecommendedMin,
            lunchRecommendedMax,
            dinnerRecommendedMin,
            dinnerRecommendedMax,
        } = calculateRecommendedCalories(calories);


        await AsyncStorage.setItem(USER_CALORIES_GOAL, JSON.stringify(calories));
        await AsyncStorage.setItem(USER_CARBS_GOAL, JSON.stringify(carbs));
        await AsyncStorage.setItem(USER_PROTEIN_GOAL, JSON.stringify(protein));
        await AsyncStorage.setItem(USER_FAT_GOAL, JSON.stringify(fat));

        await AsyncStorage.setItem(MEAL_BREAKFAST_RECOMMENDED_MIN, JSON.stringify(breakfastRecommendedMin));
        await AsyncStorage.setItem(MEAL_BREAKFAST_RECOMMENDED_MAX, JSON.stringify(breakfastRecommendedMax));
        await AsyncStorage.setItem(MEAL_LUNCH_RECOMMENDED_MIN, JSON.stringify(lunchRecommendedMin));
        await AsyncStorage.setItem(MEAL_LUNCH_RECOMMENDED_MAX, JSON.stringify(lunchRecommendedMax));
        await AsyncStorage.setItem(MEAL_DINNER_RECOMMENDED_MIN, JSON.stringify(dinnerRecommendedMin));
        await AsyncStorage.setItem(MEAL_DINNER_RECOMMENDED_MAX, JSON.stringify(dinnerRecommendedMax));

        await AsyncStorage.setItem(SYSTEM_IS_MEAL_SETUP, JSON.stringify(true));
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
