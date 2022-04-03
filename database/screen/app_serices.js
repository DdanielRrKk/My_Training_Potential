import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_IS_WORKOUT_SETUP,
    SYSTEM_IS_MEAL_SETUP,
    SYSTEM_IS_USER_SETUP,
    SYSTEM_LAST_DAY_OPENED,
    USER_CALORIES_GOAL,
    USER_CARBS_GOAL,
    USER_PROTEIN_GOAL,
    USER_FAT_GOAL,
    MEAL_LOG,
    MEAL_TOTAL_CALORIES,
    MEAL_TOTAL_CARBS,
    MEAL_TOTAL_PROTEIN,
    MEAL_TOTAL_FAT,
    MEAL_WATER
} from '../database_stores';
import { IsResultEmpty } from '../../helpers/validations';
import { getCurrentDateForLog } from '../../helpers/dateHelper';



// get data for root navigation
export async function GetAppData() {
    try {
        const isUserSetupResult = await AsyncStorage.getItem(SYSTEM_IS_USER_SETUP);
        // console.log('isUserSetupResult', isUserSetupResult);
        if(IsResultEmpty(isUserSetupResult)) return console.log('system is user setup has no data'); 

        const isMealSetupResult = await AsyncStorage.getItem(SYSTEM_IS_MEAL_SETUP);
        // console.log('isMealSetupResult', isMealSetupResult);
        if(IsResultEmpty(isMealSetupResult)) return console.log('system is meal setup has no data'); 

        const isWorkoutSetupResult = await AsyncStorage.getItem(SYSTEM_IS_WORKOUT_SETUP);
        // console.log('isWorkoutSetupResult', isWorkoutSetupResult);
        if(IsResultEmpty(isWorkoutSetupResult)) return console.log('system is workout setup has no data'); 
        

        // store has data
        const isUserSetup = JSON.parse(isUserSetupResult);
        const isMealSetup = JSON.parse(isMealSetupResult);
        const isWorkoutSetup = JSON.parse(isWorkoutSetupResult);

        // console.log('isUserSetup', isUserSetup);
        // console.log('isMealSetup', isMealSetup);
        // console.log('isWorkoutSetup', isWorkoutSetup);

        return {
            isUserSetup: isUserSetup,
            isMealSetup: isMealSetup,
            isWorkoutSetup: isWorkoutSetup
        }        
    } catch (error) {
        console.log(error);
    }
}



// save data if day changed
export async function SaveDataIfDayChanged() {
    try {
        const lastDayOpenedString = await AsyncStorage.getItem(SYSTEM_LAST_DAY_OPENED);
        console.log('lastDayOpenedString', lastDayOpenedString);
        
        const today = new Date();
        const savedString = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
        console.log('savedString', savedString);

        if(lastDayOpenedString == 'null' || lastDayOpenedString == null) {
            console.log('lastDayOpenedString has no data');
            return;
        }

        if(lastDayOpenedString == savedString) {
            console.log('lastDayOpenedString is current day');
            return;
        }

        console.log('lastDayOpenedString is old');

        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
        // console.log('mealLogResult', mealLogResult);
        if(IsResultEmpty(mealLogResult)) return console.log('meal log has no data'); 


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


        const mealLog = JSON.parse(mealLogResult);

        const water = JSON.parse(waterResult);
        const totalCalories = JSON.parse(totalCaloriesResult);
        const totalCarbs = JSON.parse(totalCarbsResult);
        const totalProtein = JSON.parse(totalProteinResult);
        const totalFat = JSON.parse(totalFatResult);

        const mealCaloriesGoal = JSON.parse(mealCaloriesGoalResult);
        const mealCarbsGoal = JSON.parse(mealCarbsGoalResult);
        const mealProteinGoal = JSON.parse(mealProteinGoalResult);
        const mealFatGoal = JSON.parse(mealFatGoalResult);
        
        // console.log('mealLog', mealLog);

        // console.log('water', water);
        // console.log('totalCalories', totalCalories);
        // console.log('totalCarbs', totalCarbs);
        // console.log('totalProtein', totalProtein);
        // console.log('totalFat', totalFat);
        
        // console.log('mealCaloriesGoal', mealCaloriesGoal);
        // console.log('mealCarbsGoal', mealCarbsGoal);
        // console.log('mealProteinGoal', mealProteinGoal);
        // console.log('mealFatGoal', mealFatGoal);
        
        console.log('mealLog before', mealLog);
        
        const currentDate = getCurrentDateForLog();
        const lastKey = (mealLog.length == 0) ? 1 : mealLog[mealLog.length - 1].key + 1;
        const log = [...mealLog, {
            key: lastKey,
                water: water,
                totalCalories: totalCalories,
                totalCarbs: totalCarbs,
                totalProtein: totalProtein,
                totalFat: totalFat,
                caloriesGoal: mealCaloriesGoal,
                carbsGoal: mealCarbsGoal,
                proteinGoal: mealProteinGoal,
                fatGoal: mealFatGoal,
                date: currentDate
        }];

        console.log('mealLog after', log);

        await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(log));
        await AsyncStorage.setItem(SYSTEM_LAST_DAY_OPENED, savedString);
        
        await AsyncStorage.setItem(MEAL_WATER, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_TOTAL_CALORIES, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_TOTAL_CARBS, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_TOTAL_PROTEIN, JSON.stringify(null));
        await AsyncStorage.setItem(MEAL_TOTAL_FAT, JSON.stringify(null));
        
        console.log('work done');
        return;
    } catch (error) {
        console.log(error);
    }
}
