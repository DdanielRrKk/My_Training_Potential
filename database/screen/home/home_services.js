import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    USER_NAME,
    USER_WEIGHT,
    USER_CALORIES_GOAL,
    USER_CARBS_GOAL,
    USER_PROTEIN_GOAL,
    USER_FAT_GOAL,
    MEAL_TOTAL_CALORIES,
    MEAL_TOTAL_CARBS,
    MEAL_TOTAL_PROTEIN,
    MEAL_TOTAL_FAT,
    WORKOUT_MONDAY,
    WORKOUT_TUESDAY,
    WORKOUT_WEDNESDAY,
    WORKOUT_THURSDAY,
    WORKOUT_FRIDAY,
    WORKOUT_SATURDAY,
    WORKOUT_SUNDAY
} from '../../database_stores';
import { IsResultEmpty } from '../../../helpers/databaseValidations';
import { valuePercentageOfValue } from '../../../helpers/basicCalculations';



// get data for home screen
export async function GetHomeScreenData() {
    try {
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
        }// console.log('todaysWorkoutResult', todaysWorkoutResult);
        if(IsResultEmpty(todaysWorkoutResult)) return console.log('todays workout has no data'); 


        // store has data
        const userName = JSON.parse(userNameResult);
        const userWeight = JSON.parse(userWeightResult);
        const mealCaloriesGoal = JSON.parse(mealCaloriesGoalResult);
        const mealCarbsGoal = JSON.parse(mealCarbsGoalResult);
        const mealProteinGoal = JSON.parse(mealProteinGoalResult);
        const mealFatGoal = JSON.parse(mealFatGoalResult);
        
        const totalCalories = JSON.parse(totalCaloriesResult);
        const totalCarbs = JSON.parse(totalCarbsResult);
        const totalProtein = JSON.parse(totalProteinResult);
        const totalFat = JSON.parse(totalFatResult);
        
        const todaysWorkout = JSON.parse(todaysWorkoutResult);

        // console.log('isMealSetup', isMealSetup);
        // console.log('userName', userName);
        // console.log('userWeight', userWeight);
        // console.log('mealCaloriesGoal', mealCaloriesGoal);
        // console.log('mealCarbsGoal', mealCarbsGoal);
        // console.log('mealProteinGoal', mealProteinGoal);
        // console.log('mealFatGoal', mealFatGoal);
        
        // console.log('totalCalories', totalCalories);
        // console.log('totalCarbs', totalCarbs);
        // console.log('totalProtein', totalProtein);
        // console.log('totalFat', totalFat);
        
        // console.log('todaysWorkout', todaysWorkout);

        const percentageCalories = valuePercentageOfValue(totalCalories, mealCaloriesGoal);
        const percentageCarbs = valuePercentageOfValue(totalCarbs, mealCarbsGoal);
        const percentageProtein = valuePercentageOfValue(totalProtein, mealProteinGoal);
        const percentageFat = valuePercentageOfValue(totalFat, mealFatGoal);

        // console.log('percentageCalories', percentageCalories);
        // console.log('percentageCarbs', percentageCarbs);
        // console.log('percentageProtein', percentageProtein);
        // console.log('percentageFat', percentageFat);

        return {
            name: userName,
            weight: userWeight,
            caloriesPercentage: percentageCalories,
            carbsPercentage: percentageCarbs,
            proteinPercentage: percentageProtein,
            fatPercentage: percentageFat,
            caloriesGoal: mealCaloriesGoal,
            carbsGoal: mealCarbsGoal,
            proteinGoal: mealProteinGoal,
            fatGoal: mealFatGoal,
            todaysWorkout: todaysWorkout
        }        
    } catch (error) {
        console.log(error);
    }
}
