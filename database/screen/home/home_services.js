import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_STATE,
    USER_INFO,
    USER_GOALS,
    MEAL_LOG,
    STEPS_LOG,
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
    SYSTEM_USER_AND_MEAL_SETUP, 
    SYSTEM_USER_AND_WORKOUT_SETUP,
    SYSTEM_ALL_SETUP 
} from '../../../helpers/constants';



// get all data for home screen
export async function GetHomeScreenData() {
    try {
        const systemStateResult = await AsyncStorage.getItem(SYSTEM_STATE);
        const systemState = parseInt(systemStateResult);

        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);

        const stepsLogResult = await AsyncStorage.getItem(STEPS_LOG);
        const stepsLog = JSON.parse(stepsLogResult);
        // console.log('stepsLog home', stepsLog);

        switch(systemState) {
            case SYSTEM_USER_AND_MEAL_SETUP: {
                const userGoalsResult = await AsyncStorage.getItem(USER_GOALS);
                const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
                
                const userGoals = JSON.parse(userGoalsResult);
                const mealLog = JSON.parse(mealLogResult); 

                const percentageCalories = GetPercentageOfSmallValueInBigValue(mealLog[0].totalCalories, userGoals.caloriesGoal);
                const percentageCarbs = GetPercentageOfSmallValueInBigValue(mealLog[0].totalCarbs, userGoals.carbsGoal);
                const percentageProtein = GetPercentageOfSmallValueInBigValue(mealLog[0].totalProtein, userGoals.proteinGoal);
                const percentageFat = GetPercentageOfSmallValueInBigValue(mealLog[0].totalFat, userGoals.fatGoal);

                return {
                    name: user.name,
                    weight: user.weight,
                    steps: stepsLog[0].steps,
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

                return {
                    name: user.name,
                    weight: user.weight,
                    steps: stepsLog[0].steps,
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

                const percentageCalories = GetPercentageOfSmallValueInBigValue(mealLog[0].totalCalories, userGoals.caloriesGoal);
                const percentageCarbs = GetPercentageOfSmallValueInBigValue(mealLog[0].totalCarbs, userGoals.carbsGoal);
                const percentageProtein = GetPercentageOfSmallValueInBigValue(mealLog[0].totalProtein, userGoals.proteinGoal);
                const percentageFat = GetPercentageOfSmallValueInBigValue(mealLog[0].totalFat, userGoals.fatGoal);

                return {
                    name: user.name,
                    weight: user.weight,
                    steps: stepsLog[0].steps,
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
                steps: stepsLog[0].steps,
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
