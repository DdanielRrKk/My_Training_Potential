import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    USER_CALORIES_GOAL,
    USER_CARBS_GOAL,
    USER_PROTEIN_GOAL,
    USER_FAT_GOAL,
    MEAL_BREAKFAST_TOTAL_CALORIES,
    MEAL_LUNCH_TOTAL_CALORIES,
    MEAL_DINNER_TOTAL_CALORIES,
    MEAL_LOG
} from '../../database_stores';
import { IsResultEmpty } from '../../../helpers/validations';



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

        
        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
        // console.log('mealLogResult', mealLogResult);
        if(IsResultEmpty(mealLogResult)) return console.log('meal log has no data'); 


        // store has data
        const caloriesGoal = JSON.parse(mealCaloriesGoalResult);
        const carbsGoal = JSON.parse(mealCarbsGoalResult);
        const proteinGoal = JSON.parse(mealProteinGoalResult);
        const fatGoal = JSON.parse(mealFatGoalResult);
        const breakfastCalories = JSON.parse(mealBreakfastCaloriesResult);
        const lunchCalories = JSON.parse(mealLunchCaloriesResult);
        const dinnerCalories = JSON.parse(mealDinnerCaloriesResult);
        
        const mealLog = JSON.parse(mealLogResult);
        
        const water = parseInt(mealLog[mealLog.length - 1].water);
        const totalCalories = parseInt(mealLog[mealLog.length - 1].totalCalories);
        const totalCarbs = parseInt(mealLog[mealLog.length - 1].totalCarbs);
        const totalProtein = parseInt(mealLog[mealLog.length - 1].totalProtein);
        const totalFat = parseInt(mealLog[mealLog.length - 1].totalFat);

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
    const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
    // console.log('mealLogResult', mealLogResult);
    if(IsResultEmpty(mealLogResult)) return console.log('meal log has no data'); 

    const mealLog = JSON.parse(mealLogResult);
    // console.log('mealLog', mealLog);

    mealLog[mealLog.length - 1].water = parseInt(mealLog[mealLog.length - 1].water) + DEFAULT_WATER_VALUE;
    // console.log('mealLog[mealLog.length - 1].water', mealLog[mealLog.length - 1].water);

    await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(mealLog));
    return;
}

export async function RemoveWater() {
    const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
    // console.log('mealLogResult', mealLogResult);
    if(IsResultEmpty(mealLogResult)) return console.log('meal log has no data'); 

    const mealLog = JSON.parse(mealLogResult);
    // console.log('mealLog', mealLog);
    
    if(parseInt(mealLog[mealLog.length - 1].water) != 0) {
        mealLog[mealLog.length - 1].water = parseInt(mealLog[mealLog.length - 1].water) + DEFAULT_WATER_VALUE;
        // console.log('mealLog[mealLog.length - 1].water', mealLog[mealLog.length - 1].water);
    
        await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(mealLog));
    }
    return;
}
