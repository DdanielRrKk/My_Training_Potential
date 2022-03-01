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
    MEAL_LUNCH_RECOMMENDED_MIN,
    MEAL_LUNCH_RECOMMENDED_MAX,
    MEAL_LUNCH_TOTAL_CALORIES,
    MEAL_LUNCH_TOTAL_CARBS,
    MEAL_LUNCH_TOTAL_PROTEIN,
    MEAL_LUNCH_TOTAL_FAT,
    MEAL_DINNER_RECOMMENDED_MIN,
    MEAL_DINNER_RECOMMENDED_MAX,
    MEAL_DINNER_TOTAL_CALORIES,
    MEAL_DINNER_TOTAL_CARBS,
    MEAL_DINNER_TOTAL_PROTEIN,
    MEAL_DINNER_TOTAL_FAT
} from '../database_stores';
import { IsResultEmpty } from '../../helpers/databaseValidations';



export async function SetUserName(name) {
    try {
        await AsyncStorage.setItem(USER_NAME, JSON.stringify(name));
    } catch (error) {
        console.log(error);
    }
}
export async function GetUserName() {
    try {
        const result = await AsyncStorage.getItem(USER_NAME);
        return (IsResultEmpty(result)) ? console.log('user name has no data') : JSON.parse(result);
    } catch (error) {
        console.log(error);
    }
}



export async function SetUserGender(gender) {
    try {
        await AsyncStorage.setItem(USER_GENDER, JSON.stringify(gender));
    } catch (error) {
        console.log(error);
    }
}
export async function GetUserGender() {
    try {
        const result = await AsyncStorage.getItem(USER_GENDER);
        return (IsResultEmpty(result)) ? console.log('user gender has no data') : parseInt(JSON.parse(result));
    } catch (error) {
        console.log(error);
    }
}



export async function SetUserMeasurements(age, weight, height) {
    try {
        await AsyncStorage.setItem(USER_AGE, JSON.stringify(age));
        await AsyncStorage.setItem(USER_WEIGHT, JSON.stringify(weight));
        await AsyncStorage.setItem(USER_HEIGHT, JSON.stringify(height));
    } catch (error) {
        console.log(error);
    }
}
export async function GetUserMeasurements() {
    try {
        const ageResult = await AsyncStorage.getItem(USER_AGE);
        const weightResult = await AsyncStorage.getItem(USER_WEIGHT);
        const heightResult = await AsyncStorage.getItem(USER_HEIGHT);
        if(IsResultEmpty(ageResult) || IsResultEmpty(weightResult) || IsResultEmpty(heightResult))
            return console.log('user measurements has no data');
        return {
            age: parseInt(JSON.parse(ageResult)),
            weight: parseInt(JSON.parse(weightResult)),
            height: parseInt(JSON.parse(heightResult))
        }
    } catch (error) {
        console.log(error);
    }
}



export async function SetSystemIsUserSetup(flag) {
    try {
        await AsyncStorage.setItem(SYSTEM_IS_USER_SETUP, JSON.stringify(flag));
        console.log('system is user setup set', flag);
    } catch (error) {
        console.log(error);
    }
}
export async function GetSystemIsUserSetup() {
    try {
        const result = await AsyncStorage.getItem(SYSTEM_IS_USER_SETUP);
        console.log('system is user setup result', result);
        return (IsResultEmpty(result)) ? console.log('system is user setup has no data') : JSON.parse(result);
    } catch (error) {
        console.log(error);
    }
}