import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    USER_INFO,
    USER_CALORIES_GOAL,
    USER_CARBS_GOAL,
    USER_PROTEIN_GOAL,
    USER_FAT_GOAL,
    WORKOUT_PLAN_NAME,
    WORKOUT_MONDAY,
    WORKOUT_TUESDAY,
    WORKOUT_WEDNESDAY,
    WORKOUT_THURSDAY,
    WORKOUT_FRIDAY,
    WORKOUT_SATURDAY,
    WORKOUT_SUNDAY
} from '../../database_stores';
import { IsResultEmpty } from '../../../helpers/validations';



// get data for home screen
export async function GetEditUserDataScreenData() {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user back', user);
        return {
            name: user.name,
            age: `${user.age}`
        };
    } catch (error) {
        console.log(error);
    }
}

export async function SetEditUserData(name, age) {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user before', user);

        user.name = name;
        user.age = parseInt(age);

        await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));
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



// get data for edit workout screen
export async function GetEditWorkoutDataScreenData() {
    try {
        const planNameResult = await AsyncStorage.getItem(WORKOUT_PLAN_NAME);
        // console.log('planNameResult', planNameResult);
        if(IsResultEmpty(planNameResult)) return console.log('workout plan name has no data'); 
        
        const mondayResult = await AsyncStorage.getItem(WORKOUT_MONDAY);
        // console.log('mondayResult', mondayResult);
        if(IsResultEmpty(mondayResult)) return console.log('monday has no data'); 

        const tuesdayResult = await AsyncStorage.getItem(WORKOUT_TUESDAY);
        // console.log('tuesdayResult', tuesdayResult);
        if(IsResultEmpty(tuesdayResult)) return console.log('tuesday has no data'); 

        const wednesdayResult = await AsyncStorage.getItem(WORKOUT_WEDNESDAY);
        // console.log('wednesdayResult', wednesdayResult);
        if(IsResultEmpty(wednesdayResult)) return console.log('wednesday has no data'); 

        const thursdayResult = await AsyncStorage.getItem(WORKOUT_THURSDAY);
        // console.log('thursdayResult', thursdayResult);
        if(IsResultEmpty(thursdayResult)) return console.log('thursday has no data'); 

        const fridayResult = await AsyncStorage.getItem(WORKOUT_FRIDAY);
        // console.log('fridayResult', fridayResult);
        if(IsResultEmpty(fridayResult)) return console.log('friday has no data');

        const saturdayResult = await AsyncStorage.getItem(WORKOUT_SATURDAY);
        // console.log('saturdayResult', saturdayResult);
        if(IsResultEmpty(saturdayResult)) return console.log('saturday has no data');

        const sundayResult = await AsyncStorage.getItem(WORKOUT_SUNDAY);
        // console.log('sundayResult', sundayResult);
        if(IsResultEmpty(sundayResult)) return console.log('sunday has no data');


        // store has data
        const monday = JSON.parse(mondayResult);
        const tuesday = JSON.parse(tuesdayResult);
        const wednesday = JSON.parse(wednesdayResult);
        const thursday = JSON.parse(thursdayResult);
        const friday = JSON.parse(fridayResult);
        const saturday = JSON.parse(saturdayResult);
        const sunday = JSON.parse(sundayResult);

        // console.log('monday', monday);
        // console.log('tuesday', tuesday);
        // console.log('wednesday', wednesday);
        // console.log('thursday', thursday);
        // console.log('friday', friday);
        // console.log('saturday', saturday);
        // console.log('sunday', sunday);

        return {
            name: planNameResult,
            monday: monday, 
            tuesday: tuesday, 
            wednesday: wednesday, 
            thursday: thursday, 
            friday: friday, 
            saturday: saturday, 
            sunday: sunday
        }   
    } catch (error) {
        console.log(error);
    }
}
