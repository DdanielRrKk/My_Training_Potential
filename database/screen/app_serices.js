import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_STATE,
    USER_GOALS,
    MEAL_LOG,
    MEAL_BREAKFAST,
    MEAL_LUNCH,
    MEAL_DINNER
} from '../database_stores';
import { IsResultEmpty } from '../../helpers/validations';
import { getCurrentDateForLog, getCurrentDateString } from '../../helpers/dateHelper';



// get data for root navigation
export async function GetAppState() {
    try {
        const systemStateResult = await AsyncStorage.getItem(SYSTEM_STATE);
        // console.log('parseInt(systemStateResult)', parseInt(systemStateResult));
        return parseInt(systemStateResult);     
    } catch (error) {
        console.log('GetAppState error');
        console.log(error);
    }
}



// save data if day changed
export async function SaveDataIfDayChanged() {
    try {
        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
        const mealLog = JSON.parse(mealLogResult);
        // console.log('mealLog', mealLog);

        const userGoalsResult = await AsyncStorage.getItem(USER_GOALS);
        const userGoals = JSON.parse(userGoalsResult);
        // console.log('userGoals', userGoals);

        const currentDate = getCurrentDateForLog();
        const dateString = getCurrentDateString();
        // console.log('currentDate', currentDate);
        // console.log('dateString', dateString);

        if(IsResultEmpty(mealLog)) {
            // console.log('lastDayOpenedString has no data');
            // console.log('mealLog before', mealLog);
            const log = [{
                key: 1,
                water: 0,
                totalCalories: 0,
                totalCarbs: 0,
                totalProtein: 0,
                totalFat: 0,
                caloriesGoal: userGoals.caloriesGoal,
                carbsGoal: userGoals.carbsGoal,
                proteinGoal: userGoals.proteinGoal,
                fatGoal: userGoals.fatGoal,
                date: currentDate,
                dateString: dateString
            }, ...mealLog];
            // console.log('mealLog after', log);

            await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(log));        
            // console.log('work done');
            return;
        }

        if(!(mealLog[0].dateString == dateString)) {
            // console.log('lastDayOpenedString is old');
            // console.log('mealLog before', mealLog);
            const lastKey = (mealLog.length == 0) ? 1 : mealLog[mealLog.length - 1].key + 1;
            const log = [{
                key: lastKey,
                water: 0,
                totalCalories: 0,
                totalCarbs: 0,
                totalProtein: 0,
                totalFat: 0,
                caloriesGoal: userGoals.caloriesGoal,
                carbsGoal: userGoals.carbsGoal,
                proteinGoal: userGoals.proteinGoal,
                fatGoal: userGoals.fatGoal,
                date: currentDate,
                dateString: dateString
            }, ...mealLog];
            // console.log('mealLog after', log);

            await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(log));        
            // console.log('work done');

            const breakfastResult = await AsyncStorage.getItem(MEAL_BREAKFAST);
            const breakfast = JSON.parse(breakfastResult);
            await AsyncStorage.setItem(MEAL_BREAKFAST, JSON.stringify({
                recommendedMin: breakfast.recommendedMin,
                recommendedMax: breakfast.recommendedMax,
                totalCalories: null,
                totalCarbs: null,
                totalProtein: null,
                totalFat: null,
                foods: []
            })); 

            const lunchResult = await AsyncStorage.getItem(MEAL_LUNCH);
            const lunch = JSON.parse(lunchResult);
            await AsyncStorage.setItem(MEAL_LUNCH, JSON.stringify({
                recommendedMin: lunch.recommendedMin,
                recommendedMax: lunch.recommendedMax,
                totalCalories: null,
                totalCarbs: null,
                totalProtein: null,
                totalFat: null,
                foods: []
            })); 

            const dinnerResult = await AsyncStorage.getItem(MEAL_DINNER);
            const dinner = JSON.parse(dinnerResult);
            await AsyncStorage.setItem(MEAL_DINNER, JSON.stringify({
                recommendedMin: dinner.recommendedMin,
                recommendedMax: dinner.recommendedMax,
                totalCalories: null,
                totalCarbs: null,
                totalProtein: null,
                totalFat: null,
                foods: []
            })); 
            return;
        }

        // console.log('lastDayOpenedString is current day');
        return;
    } catch (error) {
        console.log('SaveDataIfDayChanged error');
        console.log(error);
    }
}
