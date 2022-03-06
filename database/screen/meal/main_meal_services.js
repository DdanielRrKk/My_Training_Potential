import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_IS_MEAL_SETUP,
    USER_CALORIES_GOAL,
    USER_CARBS_GOAL,
    USER_PROTEIN_GOAL,
    USER_FAT_GOAL,
    MEAL_BREAKFAST_TOTAL_CALORIES,
    MEAL_LUNCH_TOTAL_CALORIES,
    MEAL_DINNER_TOTAL_CALORIES,
    MEAL_TOTAL_CALORIES,
    MEAL_TOTAL_CARBS,
    MEAL_TOTAL_PROTEIN,
    MEAL_TOTAL_FAT,
    MEAL_WATER,
} from '../../database_stores';
import { IsResultEmpty } from '../../../helpers/databaseValidations';



// get data for main meal screen
export async function GetMainMealScreenData() {
    try {
        const isMealSetupResult = await AsyncStorage.getItem(SYSTEM_IS_MEAL_SETUP);
        // console.log('isMealSetupResult', isMealSetupResult);
        if(IsResultEmpty(isMealSetupResult)) return console.log('system is meal setup has no data'); 
        
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

        const waterResult = await AsyncStorage.getItem(MEAL_WATER);
        // console.log('waterResult', waterResult);
        if(IsResultEmpty(waterResult)) return console.log('water has no data'); 

        
        const totalCaloriesResult = await AsyncStorage.getItem(MEAL_TOTAL_CALORIES);
        // console.log('totalCaloriesResult', totalCaloriesResult);
        if(IsResultEmpty(totalCaloriesResult)) return console.log('total calories has no data'); 

        const totalCarbsResult = await AsyncStorage.getItem(MEAL_TOTAL_CARBS);
        // console.log('totalCarbsResult', totalCarbsResult);
        if(IsResultEmpty(totalCarbsResult)) return console.log('total carbs has no data'); 

        const totalProteinResult = await AsyncStorage.getItem(MEAL_TOTAL_PROTEIN);
        // console.log('totalProteinResult', totalProteinResult);
        if(IsResultEmpty(totalProteinResult)) return console.log('total protein has no data'); 

        const totalFatResult = await AsyncStorage.getItem(MEAL_TOTAL_FAT);
        // console.log('totalFatResult', totalFatResult);
        if(IsResultEmpty(totalFatResult)) return console.log('totla fat has no data'); 


        // store has data
        const isMealSetup = JSON.parse(isMealSetupResult);
        const caloriesGoal = JSON.parse(mealCaloriesGoalResult);
        const carbsGoal = JSON.parse(mealCarbsGoalResult);
        const proteinGoal = JSON.parse(mealProteinGoalResult);
        const fatGoal = JSON.parse(mealFatGoalResult);
        const breakfastCalories = JSON.parse(mealBreakfastCaloriesResult);
        const lunchCalories = JSON.parse(mealLunchCaloriesResult);
        const dinnerCalories = JSON.parse(mealDinnerCaloriesResult);
        const water = JSON.parse(waterResult);
        
        const totalCalories = JSON.parse(totalCaloriesResult);
        const totalCarbs = JSON.parse(totalCarbsResult);
        const totalProtein = JSON.parse(totalProteinResult);
        const totalFat = JSON.parse(totalFatResult);

        // console.log('isMealSetup', isMealSetup);
        // console.log('mealCaloriesGoal', mealCaloriesGoal);
        // console.log('mealCarbsGoal', mealCarbsGoal);
        // console.log('mealProteinGoal', mealProteinGoal);
        // console.log('mealFatGoal', mealFatGoal);
        // console.log('mealBreakfastCalories', mealBreakfastCalories);
        // console.log('mealLunchCalories', mealLunchCalories);
        // console.log('mealDinnerCalories', mealDinnerCalories);
        // console.log('water', water);
        
        // console.log('totalCalories', totalCalories);
        // console.log('totalCarbs', totalCarbs);
        // console.log('totalProtein', totalProtein);
        // console.log('totalFat', totalFat);

        return {
            isMealReady: isMealSetup,
            calories: totalCalories,
            carbs: totalCarbs,
            protein: totalProtein,
            fat: totalFat,
            caloriesGoal: caloriesGoal,
            carbsGoal: carbsGoal,
            proteinGoal: proteinGoal,
            fatGoal: fatGoal,
            water: water,
            breakfastCalories: breakfastCalories,
            lunchCalories: lunchCalories,
            dinnerCalories: dinnerCalories
        }        
    } catch (error) {
        console.log(error);
    }
}



const DEFAULT_WATER_VALUE = 250;

export async function AddWater() {
    const waterResult = await AsyncStorage.getItem(MEAL_WATER);
    // console.log('waterResult', waterResult);

    if(JSON.parse(waterResult) == null) {
        await AsyncStorage.setItem(MEAL_WATER, JSON.stringify(DEFAULT_WATER_VALUE));
    }
    else {
        const sum = DEFAULT_WATER_VALUE + parseInt(JSON.parse(waterResult));
        // console.log('sum waterResult with 250', sum);
        await AsyncStorage.setItem(MEAL_WATER, JSON.stringify(sum));
    }
}

export async function RemoveWater() {
    const waterResult = await AsyncStorage.getItem(MEAL_WATER);
    // console.log('waterResult', waterResult);

    if(JSON.parse(waterResult) == null || (parseInt(JSON.parse(waterResult)) - DEFAULT_WATER_VALUE) <= 0) {
        await AsyncStorage.setItem(MEAL_WATER, JSON.stringify(0));
    }
    else {
        const sum = parseInt(JSON.parse(waterResult)) - DEFAULT_WATER_VALUE;
        // console.log('sum waterResult with 250', sum);
        await AsyncStorage.setItem(MEAL_WATER, JSON.stringify(sum));
    }
}
