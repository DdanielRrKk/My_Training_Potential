import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_STATE,
    USER_INFO,
    USER_GOALS,
    MEAL_LOG,
    // STEPS_LOG,
    WORKOUT_PLAN
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

        // const stepsLogResult = await AsyncStorage.getItem(STEPS_LOG);
        // const stepsLog = JSON.parse(stepsLogResult);
        // console.log('stepsLog home', stepsLog);

        switch(systemState) {
            case SYSTEM_USER_AND_MEAL_SETUP: {
                const userGoalsResult = await AsyncStorage.getItem(USER_GOALS);
                const userGoals = JSON.parse(userGoalsResult);

                const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
                const mealLog = JSON.parse(mealLogResult); 

                const percentageCalories = GetPercentageOfSmallValueInBigValue(mealLog[0].totalCalories, userGoals.caloriesGoal);
                const percentageCarbs = GetPercentageOfSmallValueInBigValue(mealLog[0].totalCarbs, userGoals.carbsGoal);
                const percentageProtein = GetPercentageOfSmallValueInBigValue(mealLog[0].totalProtein, userGoals.proteinGoal);
                const percentageFat = GetPercentageOfSmallValueInBigValue(mealLog[0].totalFat, userGoals.fatGoal);

                return {
                    name: user.name,
                    weight: user.weight,
                    // steps: stepsLog[0].steps,
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
                const workoutPlanResult = await AsyncStorage.getItem(WORKOUT_PLAN);
                const workoutPlan = JSON.parse(workoutPlanResult);

                if(workoutPlan.type == 0) {
                    const today = new Date();
                    let currentWorkoutIndex = null;
                    switch(today.getDay()) {
                        case 0: currentWorkoutIndex = 6; break;
                        case 1: currentWorkoutIndex = 0; break;
                        case 2: currentWorkoutIndex = 1; break;
                        case 3: currentWorkoutIndex = 2; break;
                        case 4: currentWorkoutIndex = 3; break;
                        case 5: currentWorkoutIndex = 4; break;
                        case 6: currentWorkoutIndex = 5; break;
                        default: return null;
                    }

                    return {
                        name: user.name,
                        weight: user.weight,
                        // steps: stepsLog[0].steps,
                        caloriesPercentage: null,
                        carbsPercentage: null,
                        proteinPercentage: null,
                        fatPercentage: null,
                        caloriesGoal: null,
                        carbsGoal: null,
                        proteinGoal: null,
                        fatGoal: null,
                        todaysWorkout: workoutPlan.workouts[currentWorkoutIndex],
                        isMealSetup: false,
                        isWorkoutSetup: true
                    };
                }

                return {
                    name: user.name,
                    weight: user.weight,
                    // steps: stepsLog[0].steps,
                    caloriesPercentage: null,
                    carbsPercentage: null,
                    proteinPercentage: null,
                    fatPercentage: null,
                    caloriesGoal: null,
                    carbsGoal: null,
                    proteinGoal: null,
                    fatGoal: null,
                    todaysWorkout: workoutPlan.workouts[workoutPlan.current_workout],
                    isMealSetup: false,
                    isWorkoutSetup: true
                };
            }


            case SYSTEM_ALL_SETUP: {
                const userGoalsResult = await AsyncStorage.getItem(USER_GOALS);
                const userGoals = JSON.parse(userGoalsResult);

                const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
                const mealLog = JSON.parse(mealLogResult); 

                const percentageCalories = GetPercentageOfSmallValueInBigValue(mealLog[0].totalCalories, userGoals.caloriesGoal);
                const percentageCarbs = GetPercentageOfSmallValueInBigValue(mealLog[0].totalCarbs, userGoals.carbsGoal);
                const percentageProtein = GetPercentageOfSmallValueInBigValue(mealLog[0].totalProtein, userGoals.proteinGoal);
                const percentageFat = GetPercentageOfSmallValueInBigValue(mealLog[0].totalFat, userGoals.fatGoal);
                
                
                const workoutPlanResult = await AsyncStorage.getItem(WORKOUT_PLAN);
                const workoutPlan = JSON.parse(workoutPlanResult);

                if(workoutPlan.type == 0) {
                    const today = new Date();
                    let currentWorkoutIndex = null;
                    switch(today.getDay()) {
                        case 0: currentWorkoutIndex = 6; break;
                        case 1: currentWorkoutIndex = 0; break;
                        case 2: currentWorkoutIndex = 1; break;
                        case 3: currentWorkoutIndex = 2; break;
                        case 4: currentWorkoutIndex = 3; break;
                        case 5: currentWorkoutIndex = 4; break;
                        case 6: currentWorkoutIndex = 5; break;
                        default: return null;
                    }

                    return {
                        name: user.name,
                        weight: user.weight,
                        // steps: stepsLog[0].steps,
                        caloriesPercentage: percentageCalories,
                        carbsPercentage: percentageCarbs,
                        proteinPercentage: percentageProtein,
                        fatPercentage: percentageFat,
                        caloriesGoal: userGoals.caloriesGoal,
                        carbsGoal: userGoals.carbsGoal,
                        proteinGoal: userGoals.proteinGoal,
                        fatGoal: userGoals.fatGoal,
                        todaysWorkout: workoutPlan.workouts[currentWorkoutIndex],
                        isMealSetup: true,
                        isWorkoutSetup: true
                    };
                }

                return {
                    name: user.name,
                    weight: user.weight,
                    // steps: stepsLog[0].steps,
                    caloriesPercentage: percentageCalories,
                    carbsPercentage: percentageCarbs,
                    proteinPercentage: percentageProtein,
                    fatPercentage: percentageFat,
                    caloriesGoal: userGoals.caloriesGoal,
                    carbsGoal: userGoals.carbsGoal,
                    proteinGoal: userGoals.proteinGoal,
                    fatGoal: userGoals.fatGoal,
                    todaysWorkout: workoutPlan.workouts[workoutPlan.current_workout],
                    isMealSetup: true,
                    isWorkoutSetup: true
                };
            }


            default: return {
                name: user.name,
                weight: user.weight,
                // steps: stepsLog[0].steps,
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
