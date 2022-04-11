import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    USER_GOALS,
    MEAL_BREAKFAST,
    MEAL_LUNCH,
    MEAL_DINNER,
    MEAL_LOG
} from '../../database_stores';



// get data for main meal screen
export async function GetMainMealScreenData() {
    try {
        const userGoalsResult = await AsyncStorage.getItem(USER_GOALS);
        const userGoals = JSON.parse(userGoalsResult);
        // console.log('userGoals', userGoals); 

        const breakfastResult = await AsyncStorage.getItem(MEAL_BREAKFAST);
        const lunchResult = await AsyncStorage.getItem(MEAL_LUNCH);
        const dinnerResult = await AsyncStorage.getItem(MEAL_DINNER);
        const breakfast = JSON.parse(breakfastResult);
        const lunch = JSON.parse(lunchResult);
        const dinner = JSON.parse(dinnerResult);
        // console.log('breakfast', breakfast);
        // console.log('lunch', lunch);
        // console.log('dinner', dinner);
        
        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
        const mealLog = JSON.parse(mealLogResult);
        // console.log('mealLog', mealLog); 

        return {
            water: mealLog[mealLog.length - 1].water,
            calories: mealLog[mealLog.length - 1].totalCalories,
            carbs: mealLog[mealLog.length - 1].totalCarbs,
            protein: mealLog[mealLog.length - 1].totalProtein,
            fat: mealLog[mealLog.length - 1].totalFat,
            caloriesGoal: userGoals.caloriesGoal,
            carbsGoal: userGoals.carbsGoal,
            proteinGoal: userGoals.proteinGoal,
            fatGoal: userGoals.fatGoal,
            breakfastCalories: breakfast.totalCalories,
            lunchCalories: lunch.totalCalories,
            dinnerCalories: dinner.totalCalories
        }        
    } catch (error) {
        console.log('GetMainMealScreenData error');
        console.log(error);
    }
}



const DEFAULT_WATER_VALUE = 250;

export async function AddWater() {
    try {
        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
        const mealLog = JSON.parse(mealLogResult);
        // console.log('mealLog', mealLog);

        mealLog[mealLog.length - 1].water = parseInt(mealLog[mealLog.length - 1].water) + DEFAULT_WATER_VALUE;
        // console.log('mealLog[mealLog.length - 1].water', mealLog[mealLog.length - 1].water);

        await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(mealLog));
        return;
    } catch (error) {
        console.log('AddWater error');
        console.log(error);
    }
}

export async function RemoveWater() {
    try {
        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
        const mealLog = JSON.parse(mealLogResult);
        // console.log('mealLog', mealLog);
        
        if(parseInt(mealLog[mealLog.length - 1].water) != 0) {
            mealLog[mealLog.length - 1].water = parseInt(mealLog[mealLog.length - 1].water) - DEFAULT_WATER_VALUE;
            // console.log('mealLog[mealLog.length - 1].water', mealLog[mealLog.length - 1].water);
        
            await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(mealLog));
        }
        return;
    } catch (error) {
        console.log('RemoveWater error');
        console.log(error);
    }
}
