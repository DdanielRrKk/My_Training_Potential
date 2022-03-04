import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_IS_WORKOUT_SETUP,
    SYSTEM_IS_MEAL_SETUP,
    SYSTEM_IS_USER_SETUP,
    USER_NAME,
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



// get data for home screen
export async function GetHomeScreenData() {
    try {
        const isMealSetupResult = await AsyncStorage.getItem(SYSTEM_IS_MEAL_SETUP);
        // console.log('isMealSetupResult', isMealSetupResult);
        if(IsResultEmpty(isMealSetupResult)) return console.log('system is meal setup has no data'); 
        
        const userNameResult = await AsyncStorage.getItem(USER_NAME);
        // console.log('userNameResult', userNameResult);
        if(IsResultEmpty(userNameResult)) return console.log('user name has no data'); 
        
        const userWeightResult = await AsyncStorage.getItem(USER_WEIGHT);
        // console.log('userWeightResult', userWeightResult);
        if(IsResultEmpty(userWeightResult)) return console.log('user weight has no data'); 

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


        // store has data
        const isMealSetup = JSON.parse(isMealSetupResult);
        const userName = JSON.parse(userNameResult);
        const userWeight = JSON.parse(userWeightResult);
        const mealCaloriesGoal = JSON.parse(mealCaloriesGoalResult);
        const mealCarbsGoal = JSON.parse(mealCarbsGoalResult);
        const mealProteinGoal = JSON.parse(mealProteinGoalResult);
        const mealFatGoal = JSON.parse(mealFatGoalResult);

        // console.log('isMealSetup', isMealSetup);
        // console.log('userName', userName);
        // console.log('userWeight', userWeight);
        // console.log('mealCaloriesGoal', mealCaloriesGoal);
        // console.log('mealCarbsGoal', mealCarbsGoal);
        // console.log('mealProteinGoal', mealProteinGoal);
        // console.log('mealFatGoal', mealFatGoal);

        return {
            isMealReady: isMealSetup,
            name: userName,
            weight: userWeight,
            calories: mealCaloriesGoal,
            carbs: mealCarbsGoal,
            protein: mealProteinGoal,
            fat: mealFatGoal
        }        
    } catch (error) {
        console.log(error);
    }
}
