import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_STATE,
    USER_INFO,
    USER_GOALS,
    MEAL_LOG,
    WORKOUT_MONDAY,
    WORKOUT_TUESDAY,
    WORKOUT_WEDNESDAY,
    WORKOUT_THURSDAY,
    WORKOUT_FRIDAY,
    WORKOUT_SATURDAY,
    WORKOUT_SUNDAY
} from '../../database_stores';
import { GetPercentageOfSmallValueInBigValue } from '../../../helpers/helpers';
import { 
    SYSTEM_USER_SETUP,
    SYSTEM_USER_AND_MEAL_SETUP, 
    SYSTEM_USER_AND_WORKOUT_SETUP,
    SYSTEM_ALL_SETUP 
} from '../../../helpers/constants';



// get main data for home screen
export async function GetMainHomeScreenData() {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user', user);

        return {
            name: user.name,
            weight: user.weight
        };
    } catch (error) {
        console.log('GetMainHomeScreenData error');
        console.log(error);
    }
}



// get main and only meal setup data for home screen
export async function GetMainAndOnlyMealHomeScreenData() {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const userGoalsResult = await AsyncStorage.getItem(USER_GOALS);
        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
        
        const user = JSON.parse(userResult);
        const userGoals = JSON.parse(userGoalsResult);
        const mealLog = JSON.parse(mealLogResult);
        // console.log('user', user);       
        // console.log('mealLog', mealLog);
        // console.log('userGoals', userGoals);

        const percentageCalories = GetPercentageOfSmallValueInBigValue(mealLog[mealLog.length - 1].totalCalories, userGoals.caloriesGoal);
        const percentageCarbs = GetPercentageOfSmallValueInBigValue(mealLog[mealLog.length - 1].totalCarbs, userGoals.carbsGoal);
        const percentageProtein = GetPercentageOfSmallValueInBigValue(mealLog[mealLog.length - 1].totalProtein, userGoals.proteinGoal);
        const percentageFat = GetPercentageOfSmallValueInBigValue(mealLog[mealLog.length - 1].totalFat, userGoals.fatGoal);

        // console.log('percentageCalories', percentageCalories);
        // console.log('percentageCarbs', percentageCarbs);
        // console.log('percentageProtein', percentageProtein);
        // console.log('percentageFat', percentageFat);

        return {
            name: user.name,
            weight: user.weight,
            caloriesPercentage: percentageCalories,
            carbsPercentage: percentageCarbs,
            proteinPercentage: percentageProtein,
            fatPercentage: percentageFat,
            caloriesGoal: userGoals.caloriesGoal,
            carbsGoal: userGoals.carbsGoal,
            proteinGoal: userGoals.proteinGoal,
            fatGoal: userGoals.fatGoal
        };
    } catch (error) {
        console.log('GetMainAndOnlyMealHomeScreenData error');
        console.log(error);
    }
}



// get main and only workout setup data for home screen
export async function GetMainAndOnlyWorkoutHomeScreenData() {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);

        let todaysWorkoutResult = null;
        const today = new Date();
        switch(today.getDay()) {
            case 0: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_SUNDAY); break;
            case 1: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_MONDAY); break;
            case 2: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_TUESDAY); break;
            case 3: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_WEDNESDAY); break;
            case 4: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_THURSDAY); break;
            case 5: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_FRIDAY); break;
            case 6: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_SATURDAY); break;
            default: todaysWorkoutResult= '';
        }
        const user = JSON.parse(userResult);  
        const todaysWorkout = JSON.parse(todaysWorkoutResult);
        // console.log('todaysWorkout', todaysWorkout);
        // console.log('user back', user); 

        return {
            name: user.name,
            weight: user.weight,
            todaysWorkout: todaysWorkout
        };
    } catch (error) {
        console.log('GetMainAndOnlyWorkoutHomeScreenData error');
        console.log(error);
    }
}




// get all seup data for home screen
export async function GetAllHomeScreenData() {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const userGoalsResult = await AsyncStorage.getItem(USER_GOALS);
        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);

        let todaysWorkoutResult = null;
        const today = new Date();
        switch(today.getDay()) {
            case 0: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_SUNDAY); break;
            case 1: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_MONDAY); break;
            case 2: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_TUESDAY); break;
            case 3: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_WEDNESDAY); break;
            case 4: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_THURSDAY); break;
            case 5: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_FRIDAY); break;
            case 6: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_SATURDAY); break;
            default: todaysWorkoutResult= '';
        }

        const user = JSON.parse(userResult);
        const mealLog = JSON.parse(mealLogResult); 
        const userGoals = JSON.parse(userGoalsResult);
        const todaysWorkout = JSON.parse(todaysWorkoutResult);

        // console.log('user', user);       
        // console.log('mealLog', mealLog);
        // console.log('userGoals', userGoals);
        // console.log('todaysWorkout', todaysWorkout);

        const percentageCalories = GetPercentageOfSmallValueInBigValue(mealLog[mealLog.length - 1].totalCalories, userGoals.caloriesGoal);
        const percentageCarbs = GetPercentageOfSmallValueInBigValue(mealLog[mealLog.length - 1].totalCarbs, userGoals.carbsGoal);
        const percentageProtein = GetPercentageOfSmallValueInBigValue(mealLog[mealLog.length - 1].totalProtein, userGoals.proteinGoal);
        const percentageFat = GetPercentageOfSmallValueInBigValue(mealLog[mealLog.length - 1].totalFat, userGoals.fatGoal);

        // console.log('percentageCalories', percentageCalories);
        // console.log('percentageCarbs', percentageCarbs);
        // console.log('percentageProtein', percentageProtein);
        // console.log('percentageFat', percentageFat);

        return {
            name: user.name,
            weight: user.weight,
            caloriesPercentage: percentageCalories,
            carbsPercentage: percentageCarbs,
            proteinPercentage: percentageProtein,
            fatPercentage: percentageFat,
            caloriesGoal: userGoals.caloriesGoal,
            carbsGoal: userGoals.carbsGoal,
            proteinGoal: userGoals.proteinGoal,
            fatGoal: userGoals.fatGoal,
            todaysWorkout: todaysWorkout
        }        
    } catch (error) {
        console.log('GetAllHomeScreenData error');
        console.log(error);
    }
}









// get all seup data for home screen
export async function GetHomeScreenData() {
    try {
        const systemStateResult = await AsyncStorage.getItem(SYSTEM_STATE);
        const systemState = parseInt(systemStateResult);

        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user', user);

        switch(systemState) {
            case SYSTEM_USER_AND_MEAL_SETUP: {
                const userGoalsResult = await AsyncStorage.getItem(USER_GOALS);
                const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
                
                const userGoals = JSON.parse(userGoalsResult);
                const mealLog = JSON.parse(mealLogResult); 
                // console.log('mealLog', mealLog);
                // console.log('userGoals', userGoals);

                const percentageCalories = GetPercentageOfSmallValueInBigValue(mealLog[mealLog.length - 1].totalCalories, userGoals.caloriesGoal);
                const percentageCarbs = GetPercentageOfSmallValueInBigValue(mealLog[mealLog.length - 1].totalCarbs, userGoals.carbsGoal);
                const percentageProtein = GetPercentageOfSmallValueInBigValue(mealLog[mealLog.length - 1].totalProtein, userGoals.proteinGoal);
                const percentageFat = GetPercentageOfSmallValueInBigValue(mealLog[mealLog.length - 1].totalFat, userGoals.fatGoal);

                // console.log('percentageCalories', percentageCalories);
                // console.log('percentageCarbs', percentageCarbs);
                // console.log('percentageProtein', percentageProtein);
                // console.log('percentageFat', percentageFat);

                return {
                    name: user.name,
                    weight: user.weight,
                    caloriesPercentage: percentageCalories,
                    carbsPercentage: percentageCarbs,
                    proteinPercentage: percentageProtein,
                    fatPercentage: percentageFat,
                    caloriesGoal: userGoals.caloriesGoal,
                    carbsGoal: userGoals.carbsGoal,
                    proteinGoal: userGoals.proteinGoal,
                    fatGoal: userGoals.fatGoal,
                    todaysWorkout: null,
                    isMealSetup: true,
                    isWorkoutSetup: false
                };
            }



            case SYSTEM_USER_AND_WORKOUT_SETUP: {
                let todaysWorkoutResult = null;
                const today = new Date();
                switch(today.getDay()) {
                    case 0: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_SUNDAY); break;
                    case 1: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_MONDAY); break;
                    case 2: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_TUESDAY); break;
                    case 3: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_WEDNESDAY); break;
                    case 4: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_THURSDAY); break;
                    case 5: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_FRIDAY); break;
                    case 6: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_SATURDAY); break;
                    default: todaysWorkoutResult= '';
                }
                const todaysWorkout = JSON.parse(todaysWorkoutResult);
                // console.log('todaysWorkout', todaysWorkout);

                return {
                    name: user.name,
                    weight: user.weight,
                    caloriesPercentage: null,
                    carbsPercentage: null,
                    proteinPercentage: null,
                    fatPercentage: null,
                    caloriesGoal: null,
                    carbsGoal: null,
                    proteinGoal: null,
                    fatGoal: null,
                    todaysWorkout: todaysWorkout,
                    isMealSetup: false,
                    isWorkoutSetup: true
                };
            }



            case SYSTEM_ALL_SETUP: {
                const userGoalsResult = await AsyncStorage.getItem(USER_GOALS);
                const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);

                let todaysWorkoutResult = null;
                const today = new Date();
                switch(today.getDay()) {
                    case 0: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_SUNDAY); break;
                    case 1: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_MONDAY); break;
                    case 2: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_TUESDAY); break;
                    case 3: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_WEDNESDAY); break;
                    case 4: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_THURSDAY); break;
                    case 5: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_FRIDAY); break;
                    case 6: todaysWorkoutResult = await AsyncStorage.getItem(WORKOUT_SATURDAY); break;
                    default: todaysWorkoutResult= '';
                }

                const mealLog = JSON.parse(mealLogResult); 
                const userGoals = JSON.parse(userGoalsResult);
                const todaysWorkout = JSON.parse(todaysWorkoutResult);
     
                // console.log('mealLog', mealLog);
                // console.log('userGoals', userGoals);
                // console.log('todaysWorkout', todaysWorkout);

                const percentageCalories = GetPercentageOfSmallValueInBigValue(mealLog[mealLog.length - 1].totalCalories, userGoals.caloriesGoal);
                const percentageCarbs = GetPercentageOfSmallValueInBigValue(mealLog[mealLog.length - 1].totalCarbs, userGoals.carbsGoal);
                const percentageProtein = GetPercentageOfSmallValueInBigValue(mealLog[mealLog.length - 1].totalProtein, userGoals.proteinGoal);
                const percentageFat = GetPercentageOfSmallValueInBigValue(mealLog[mealLog.length - 1].totalFat, userGoals.fatGoal);

                // console.log('percentageCalories', percentageCalories);
                // console.log('percentageCarbs', percentageCarbs);
                // console.log('percentageProtein', percentageProtein);
                // console.log('percentageFat', percentageFat);

                return {
                    name: user.name,
                    weight: user.weight,
                    caloriesPercentage: percentageCalories,
                    carbsPercentage: percentageCarbs,
                    proteinPercentage: percentageProtein,
                    fatPercentage: percentageFat,
                    caloriesGoal: userGoals.caloriesGoal,
                    carbsGoal: userGoals.carbsGoal,
                    proteinGoal: userGoals.proteinGoal,
                    fatGoal: userGoals.fatGoal,
                    todaysWorkout: todaysWorkout,
                    isMealSetup: true,
                    isWorkoutSetup: true
                };
            }



            default: return {
                name: user.name,
                weight: user.weight,
                caloriesPercentage: null,
                carbsPercentage: null,
                proteinPercentage: null,
                fatPercentage: null,
                caloriesGoal: null,
                carbsGoal: null,
                proteinGoal: null,
                fatGoal: null,
                todaysWorkout: null,
                isMealSetup: false,
                isWorkoutSetup: false
            };
        }  
    } catch (error) {
        console.log('GetHomeScreenData error');
        console.log(error);
    }
}
