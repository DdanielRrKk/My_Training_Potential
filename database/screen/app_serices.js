import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_FLAGS,
    USER_CALORIES_GOAL,
    USER_CARBS_GOAL,
    USER_PROTEIN_GOAL,
    USER_FAT_GOAL,
    MEAL_LOG
} from '../database_stores';
import { IsResultEmpty } from '../../helpers/validations';
import { getCurrentDateForLog, getCurrentDateString, isCurrentDate } from '../../helpers/dateHelper';



// get data for root navigation
export async function GetAppData() {
    try {
        const systemFlagsResult = await AsyncStorage.getItem(SYSTEM_FLAGS);
        const systemFlags = JSON.parse(systemFlagsResult);
        // console.log('systemFlags', systemFlags);
        return systemFlags;     
    } catch (error) {
        console.log(error);
    }
}



// save data if day changed
export async function SaveDataIfDayChanged() {
    try {
        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
        const mealCaloriesGoalResult = await AsyncStorage.getItem(USER_CALORIES_GOAL);
        const mealCarbsGoalResult = await AsyncStorage.getItem(USER_CARBS_GOAL);
        const mealProteinGoalResult = await AsyncStorage.getItem(USER_PROTEIN_GOAL);
        const mealFatGoalResult = await AsyncStorage.getItem(USER_FAT_GOAL);
        // console.log('mealLogResult', mealLogResult);
        // console.log('mealCaloriesGoalResult', mealCaloriesGoalResult);
        // console.log('mealCarbsGoalResult', mealCarbsGoalResult);
        // console.log('mealProteinGoalResult', mealProteinGoalResult);
        // console.log('mealFatGoalResult', mealFatGoalResult);
        
        const mealLog = JSON.parse(mealLogResult);
        const mealCaloriesGoal = JSON.parse(mealCaloriesGoalResult);
        const mealCarbsGoal = JSON.parse(mealCarbsGoalResult);
        const mealProteinGoal = JSON.parse(mealProteinGoalResult);
        const mealFatGoal = JSON.parse(mealFatGoalResult);
        // console.log('mealLog', mealLog);
        // console.log('mealCaloriesGoal', mealCaloriesGoal);
        // console.log('mealCarbsGoal', mealCarbsGoal);
        // console.log('mealProteinGoal', mealProteinGoal);
        // console.log('mealFatGoal', mealFatGoal);

        const currentDate = getCurrentDateForLog();
        const dateString = getCurrentDateString();
        // console.log('currentDate', currentDate);
        // console.log('dateString', dateString);

        if(IsResultEmpty(mealLog)) {
            console.log('lastDayOpenedString has no data');
            console.log('mealLog before', mealLog);
            const log = [...mealLog, {
                key: 1,
                water: 0,
                totalCalories: 0,
                totalCarbs: 0,
                totalProtein: 0,
                totalFat: 0,
                caloriesGoal: mealCaloriesGoal,
                carbsGoal: mealCarbsGoal,
                proteinGoal: mealProteinGoal,
                fatGoal: mealFatGoal,
                date: currentDate,
                dateString: dateString
            }];
            console.log('mealLog after', log);

            await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(log));        
            console.log('work done');
            return;
        }

        if(isCurrentDate(mealLog[mealLog.length - 1].dateString)) {
            console.log('lastDayOpenedString is current day');
            return;
        }

        console.log('lastDayOpenedString is old');
        console.log('mealLog before', mealLog);
        const lastKey = (mealLog.length == 0) ? 1 : mealLog[mealLog.length - 1].key + 1;
        const log = [...mealLog, {
            key: lastKey,
            water: 0,
            totalCalories: 0,
            totalCarbs: 0,
            totalProtein: 0,
            totalFat: 0,
            caloriesGoal: mealCaloriesGoal,
            carbsGoal: mealCarbsGoal,
            proteinGoal: mealProteinGoal,
            fatGoal: mealFatGoal,
            date: currentDate,
            dateString: dateString
        }];
        console.log('mealLog after', log);

        await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(log));        
        console.log('work done');
        return;
    } catch (error) {
        console.log(error);
    }
}
