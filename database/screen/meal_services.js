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
    MEAL_WATER,
    MEAL_BREAKFAST_RECOMMENDED_MIN,
    MEAL_BREAKFAST_RECOMMENDED_MAX,
    MEAL_BREAKFAST_TOTAL_CALORIES,
    MEAL_BREAKFAST_TOTAL_CARBS,
    MEAL_BREAKFAST_TOTAL_PROTEIN,
    MEAL_BREAKFAST_TOTAL_FAT,
    MEAL_BREAKFAST_FOODS,
    MEAL_LUNCH_RECOMMENDED_MIN,
    MEAL_LUNCH_RECOMMENDED_MAX,
    MEAL_LUNCH_TOTAL_CALORIES,
    MEAL_LUNCH_TOTAL_CARBS,
    MEAL_LUNCH_TOTAL_PROTEIN,
    MEAL_LUNCH_TOTAL_FAT,
    MEAL_LUNCH_FOODS,
    MEAL_DINNER_RECOMMENDED_MIN,
    MEAL_DINNER_RECOMMENDED_MAX,
    MEAL_DINNER_TOTAL_CALORIES,
    MEAL_DINNER_TOTAL_CARBS,
    MEAL_DINNER_TOTAL_PROTEIN,
    MEAL_DINNER_TOTAL_FAT,
    MEAL_DINNER_FOODS
} from '../database_stores';
import { IsResultEmpty } from '../../helpers/databaseValidations';
import {
    calculateCalories,
    calculateCarbs,
    calculateProtein,
    calculateFat
} from '../../helpers/mealCalculations'



// get data for main meal screen
export async function GetMainMealScreenData() {
    try {
        const mealCaloriesGoalResult = await AsyncStorage.getItem(USER_CALORIES_GOAL);
        // console.log('mealCaloriesGoalResult', mealCaloriesGoalResult);
        if(IsResultEmpty(mealCaloriesGoalResult)) return console.log('calories goal has no data'); 

        const mealCarbsGoalResult = await AsyncStorage.getItem(USER_CARBS_GOAL);
        // console.log('mealCarbsGoalResult', mealCarbsGoalResult);
        if(IsResultEmpty(mealCarbsGoalResult)) return console.log('carbs goal has no data'); 

        const mealProteinGoalResult = await AsyncStorage.getItem(USER_PROTEIN_GOAL);
        // console.log('mealProteinGoalResult', mealProteinGoalResult);
        if(IsResultEmpty(mealProteinGoalResult)) return console.log('protein goal has no data'); 

        const mealFatGoalResult = await AsyncStorage.getItem(USER_FAT_GOAL);
        // console.log('mealFatGoalResult', mealFatGoalResult);
        if(IsResultEmpty(mealFatGoalResult)) return console.log('fat goal has no data'); 

        const mealBreakfastCaloriesResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_CALORIES);
        // console.log('mealBreakfastCaloriesResult', mealBreakfastCaloriesResult);
        if(IsResultEmpty(mealBreakfastCaloriesResult)) return console.log('breakfast calories has no data'); 

        const mealLunchCaloriesResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_CALORIES);
        // console.log('mealLunchCaloriesResult', mealLunchCaloriesResult);
        if(IsResultEmpty(mealLunchCaloriesResult)) return console.log('lunch calories has no data'); 

        const mealDinnerCaloriesResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_CALORIES);
        // console.log('mealDinnerCaloriesResult', mealDinnerCaloriesResult);
        if(IsResultEmpty(mealDinnerCaloriesResult)) return console.log('dinner calories has no data'); 


        // store has data
        const mealCaloriesGoal = JSON.parse(mealCaloriesGoalResult);
        const mealCarbsGoal = JSON.parse(mealCarbsGoalResult);
        const mealProteinGoal = JSON.parse(mealProteinGoalResult);
        const mealFatGoal = JSON.parse(mealFatGoalResult);
        const mealBreakfastCalories = JSON.parse(mealBreakfastCaloriesResult);
        const mealLunchCalories = JSON.parse(mealLunchCaloriesResult);
        const mealDinnerCalories = JSON.parse(mealDinnerCaloriesResult);

        // console.log('mealCaloriesGoal', mealCaloriesGoal);
        // console.log('mealCarbsGoal', mealCarbsGoal);
        // console.log('mealProteinGoal', mealProteinGoal);
        // console.log('mealFatGoal', mealFatGoal);
        // console.log('mealBreakfastCalories', mealBreakfastCalories);
        // console.log('mealLunchCalories', mealLunchCalories);
        // console.log('mealDinnerCalories', mealDinnerCalories);

        return {
            calories: mealCaloriesGoal,
            carbs: mealCarbsGoal,
            protein: mealProteinGoal,
            fat: mealFatGoal,
            breakfastCalories: mealBreakfastCalories,
            lunchCalories: mealLunchCalories,
            dinnerCalories: mealDinnerCalories
        }        
    } catch (error) {
        console.log(error);
    }
}

function addFoodToArray(array, {name, calories, carbs, protein, fat}) {
    const tempArray = array;
    if(tempArray.length == 0) {
        tempArray.push({
            key: 1,
            name: name,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat
        });
    }
    else {
        const lastKey = parseInt(tempArray[tempArray.length - 1].key);
        tempArray.push({
            key: lastKey + 1,
            name: name,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat
        });
    }
    return tempArray;
}
export async function AddMealFoodData(meal_number, name, calories, carbs, protein, fat) {
    try {
        if(meal_number == 1) {
            const breakfastfoodsResult = await AsyncStorage.getItem(MEAL_BREAKFAST_FOODS);
            // console.log('breakfastfoodsResult', breakfastfoodsResult);
            if(IsResultEmpty(breakfastfoodsResult)) return console.log('breakfast foods has no data');

            const breakfastcaloriesResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_CALORIES);
            // console.log('breakfastcaloriesResult', breakfastcaloriesResult);
            if(IsResultEmpty(breakfastcaloriesResult)) return console.log('breakfast total calories has no data');
        
            // store has data
            let breakfastfoods = JSON.parse(breakfastfoodsResult);
            const sumBreakfastCalories = parseInt(calories + JSON.parse(breakfastcaloriesResult));

            // console.log('breakfast foods', breakfastfoods);
            // console.log('sum breakfast calories', sumBreakfastCalories);

            breakfastfoods = addFoodToArray(breakfastfoods, {
                name: name,
                calories: calories,
                carbs: carbs,
                protein: protein,
                fat: fat
            });
            // console.log('breakfast foods after', breakfastfoods);

            await AsyncStorage.setItem(MEAL_BREAKFAST_TOTAL_CALORIES, JSON.stringify(sumBreakfastCalories));
            await AsyncStorage.setItem(MEAL_BREAKFAST_FOODS, JSON.stringify(breakfastfoods));
            return;
        }
        if(meal_number == 2) {
            const lunchfoodsResult = await AsyncStorage.getItem(MEAL_LUNCH_FOODS);
            // console.log('lunchfoodsResult', lunchfoodsResult);
            if(IsResultEmpty(lunchfoodsResult)) return console.log('lunch foods has no data');

            const lunchcaloriesResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_CALORIES);
            // console.log('lunchcaloriesResult', lunchcaloriesResult);
            if(IsResultEmpty(lunchcaloriesResult)) return console.log('lunch total calories has no data');
        
            // store has data
            let lunchfoods = JSON.parse(lunchfoodsResult);
            const sumLunchCalories = parseInt(calories + JSON.parse(lunchcaloriesResult));

            // console.log('lunch foods', lunchfoods);
            // console.log('sum lunch calories', sumLunchCalories);

            lunchfoods = addFoodToArray(lunchfoods, {
                name: name,
                calories: calories,
                carbs: carbs,
                protein: protein,
                fat: fat
            });
            // console.log('lunch foods after', lunchfoods);

            await AsyncStorage.setItem(MEAL_LUNCH_TOTAL_CALORIES, JSON.stringify(sumLunchCalories));
            await AsyncStorage.setItem(MEAL_LUNCH_FOODS, JSON.stringify(lunchfoods));
            return;
        }
        if(meal_number == 3) {
            const dinnerfoodsResult = await AsyncStorage.getItem(MEAL_DINNER_FOODS);
            // console.log('dinnerfoodsResult', dinnerfoodsResult);
            if(IsResultEmpty(dinnerfoodsResult)) return console.log('dinner foods has no data');

            const dinnercaloriesResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_CALORIES);
            // console.log('dinnercaloriesResult', dinnercaloriesResult);
            if(IsResultEmpty(dinnercaloriesResult)) return console.log('dinner total calories has no data');
        
            // store has data
            let dinnerfoods = JSON.parse(dinnerfoodsResult);
            const sumDinnerCalories = parseInt(calories + JSON.parse(dinnercaloriesResult));

            // console.log('dinner foods', dinnerfoods);
            // console.log('sum dinner calories', sumDinnerCalories);

            dinnerfoods = addFoodToArray(dinnerfoods, {
                name: name,
                calories: calories,
                carbs: carbs,
                protein: protein,
                fat: fat
            });
            // console.log('dinner foods after', dinnerfoods);

            await AsyncStorage.setItem(MEAL_DINNER_TOTAL_CALORIES, JSON.stringify(sumDinnerCalories));
            await AsyncStorage.setItem(MEAL_DINNER_FOODS, JSON.stringify(dinnerfoods));
            return;
        }
    } catch (error) {
        console.log(error);
    }
}



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

        await AsyncStorage.setItem(USER_CALORIES_GOAL, JSON.stringify(calories));
        await AsyncStorage.setItem(USER_CARBS_GOAL, JSON.stringify(carbs));
        await AsyncStorage.setItem(USER_PROTEIN_GOAL, JSON.stringify(protein));
        await AsyncStorage.setItem(USER_FAT_GOAL, JSON.stringify(fat));
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
