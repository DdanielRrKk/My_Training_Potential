import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    USER_NAME, 
    USER_AGE,
    USER_CALORIES_GOAL,
    USER_CARBS_GOAL,
    USER_PROTEIN_GOAL,
    USER_FAT_GOAL,
} from '../../database_stores';
import { IsResultEmpty } from '../../../helpers/databaseValidations';



// get data for home screen
export async function GetEditUserDataScreenData() {
    try {
        const userNameResult = await AsyncStorage.getItem(USER_NAME);
        // console.log('userNameResult', userNameResult);
        if(IsResultEmpty(userNameResult)) return console.log('user name has no data'); 
        
        const userAgeResult = await AsyncStorage.getItem(USER_AGE);
        // console.log('userAgeResult', userAgeResult);
        if(IsResultEmpty(userAgeResult)) return console.log('user age has no data'); 

        // store has data
        const userName = JSON.parse(userNameResult);
        const userAge = JSON.parse(userAgeResult);

        // console.log('userName', userName);
        // console.log('userAge', userAge);

        return {
            name: userName,
            age: userAge
        }        
    } catch (error) {
        console.log(error);
    }
}

export async function SetEditUserData(name, age) {
    try {
        await AsyncStorage.setItem(USER_NAME, JSON.stringify(name));
        await AsyncStorage.setItem(USER_AGE, JSON.stringify(age));
        return;        
    } catch (error) {
        console.log(error);
    }
}



// get data for edit meal screen
export async function GetEditMealDataScreenData() {
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


        // store has data
        const caloriesGoal = JSON.parse(mealCaloriesGoalResult);
        const carbsGoal = JSON.parse(mealCarbsGoalResult);
        const proteinGoal = JSON.parse(mealProteinGoalResult);
        const fatGoal = JSON.parse(mealFatGoalResult);

        // console.log('mealCaloriesGoal', mealCaloriesGoal);
        // console.log('mealCarbsGoal', mealCarbsGoal);
        // console.log('mealProteinGoal', mealProteinGoal);
        // console.log('mealFatGoal', mealFatGoal);

        return {
            caloriesGoal: caloriesGoal,
            carbsGoal: carbsGoal,
            proteinGoal: proteinGoal,
            fatGoal: fatGoal
        }        
    } catch (error) {
        console.log(error);
    }
}

export async function SetEditMealData(caloriesGoal, carbsGoal, proteinGoal, fatGoal) {
    try {
        await AsyncStorage.setItem(USER_CALORIES_GOAL, JSON.stringify(caloriesGoal));
        await AsyncStorage.setItem(USER_CARBS_GOAL, JSON.stringify(carbsGoal));
        await AsyncStorage.setItem(USER_PROTEIN_GOAL, JSON.stringify(proteinGoal));
        await AsyncStorage.setItem(USER_FAT_GOAL, JSON.stringify(fatGoal));
        return;        
    } catch (error) {
        console.log(error);
    }
}
