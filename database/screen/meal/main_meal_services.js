import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_STATE,
    USER_GOALS,
    MEAL_BREAKFAST,
    MEAL_LUNCH,
    MEAL_DINNER,
    MEAL_LOG
} from '../../database_stores';
import { 
    SYSTEM_USER_AND_MEAL_SETUP, 
    SYSTEM_ALL_SETUP 
} from '../../../helpers/constants';



// get data for main meal screen
export async function GetMainMealScreenData() {
    try {
        const systemStateResult = await AsyncStorage.getItem(SYSTEM_STATE);
        const systemState = parseInt(systemStateResult);
        if(systemState != SYSTEM_USER_AND_MEAL_SETUP && systemState != SYSTEM_ALL_SETUP) {
            console.log('GetMainMealScreenData is not setup');
            return {
                water: null,
                calories: null,
                carbs: null,
                protein: null,
                fat: null,
                caloriesGoal: null,
                carbsGoal: null,
                proteinGoal: null,
                fatGoal: null,
                breakfastCalories: null,
                lunchCalories: null,
                dinnerCalories: null,
                isMealSetup: false
            };
        }

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
            water: mealLog[0].water,
            calories: mealLog[0].totalCalories,
            carbs: mealLog[0].totalCarbs,
            protein: mealLog[0].totalProtein,
            fat: mealLog[0].totalFat,
            caloriesGoal: userGoals.caloriesGoal,
            carbsGoal: userGoals.carbsGoal,
            proteinGoal: userGoals.proteinGoal,
            fatGoal: userGoals.fatGoal,
            breakfastCalories: breakfast.totalCalories,
            lunchCalories: lunch.totalCalories,
            dinnerCalories: dinner.totalCalories,
            isMealSetup: true
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
