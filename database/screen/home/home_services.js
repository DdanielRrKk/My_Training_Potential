import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    USER_NAME,
    USER_WEIGHT,
    USER_CALORIES_GOAL,
    USER_CARBS_GOAL,
    USER_PROTEIN_GOAL,
    USER_FAT_GOAL,
    MEAL_LOG,
    WORKOUT_MONDAY,
    WORKOUT_TUESDAY,
    WORKOUT_WEDNESDAY,
    WORKOUT_THURSDAY,
    WORKOUT_FRIDAY,
    WORKOUT_SATURDAY,
    WORKOUT_SUNDAY
} from '../../database_stores';
import { IsResultEmpty } from '../../../helpers/validations';
import { GetPercentageOfSmallValueInBigValue } from '../../../helpers/helpers';



// get data for home screen
export async function GetHomeScreenData(isMealSetup, isWorkoutSetup) {
    try {
        const userNameResult = await AsyncStorage.getItem(USER_NAME);
        // console.log('userNameResult', userNameResult);
        if(IsResultEmpty(userNameResult)) return console.log('user name has no data'); 
        
        const userWeightResult = await AsyncStorage.getItem(USER_WEIGHT);
        // console.log('userWeightResult', userWeightResult);
        if(IsResultEmpty(userWeightResult)) return console.log('user weight has no data'); 

        // store has data
        const userName = JSON.parse(userNameResult);
        const userWeight = JSON.parse(userWeightResult);

        if(!isMealSetup && !isWorkoutSetup) {
            return {
                name: userName,
                weight: userWeight,
                caloriesPercentage: null,
                carbsPercentage: null,
                proteinPercentage: null,
                fatPercentage: null,
                caloriesGoal: null,
                carbsGoal: null,
                proteinGoal: null,
                fatGoal: null,
                todaysWorkout: null
            }   
        }

        if(!isMealSetup && isWorkoutSetup) {
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
            // console.log('todaysWorkoutResult', todaysWorkoutResult);
            if(IsResultEmpty(todaysWorkoutResult)) return console.log('todays workout has no data'); 

            const todaysWorkout = JSON.parse(todaysWorkoutResult);
            // console.log('todaysWorkout', todaysWorkout);
            return {
                name: userName,
                weight: userWeight,
                caloriesPercentage: null,
                carbsPercentage: null,
                proteinPercentage: null,
                fatPercentage: null,
                caloriesGoal: null,
                carbsGoal: null,
                proteinGoal: null,
                fatGoal: null,
                todaysWorkout: todaysWorkout
            } 
        }

        if(isMealSetup && !isWorkoutSetup) {
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


            const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
            // console.log('mealLogResult', mealLogResult);
            if(IsResultEmpty(mealLogResult)) return console.log('meal log has no data');

            // store has data
            const mealCaloriesGoal = JSON.parse(mealCaloriesGoalResult);
            const mealCarbsGoal = JSON.parse(mealCarbsGoalResult);
            const mealProteinGoal = JSON.parse(mealProteinGoalResult);
            const mealFatGoal = JSON.parse(mealFatGoalResult);
            
            const mealLog = JSON.parse(mealLogResult);

            // console.log('mealCaloriesGoal', mealCaloriesGoal);
            // console.log('mealCarbsGoal', mealCarbsGoal);
            // console.log('mealProteinGoal', mealProteinGoal);
            // console.log('mealFatGoal', mealFatGoal);
            
            // console.log('mealLog', mealLog);

            const percentageCalories = GetPercentageOfSmallValueInBigValue(totalCalories, mealCaloriesGoal);
            const percentageCarbs = GetPercentageOfSmallValueInBigValue(totalCarbs, mealCarbsGoal);
            const percentageProtein = GetPercentageOfSmallValueInBigValue(totalProtein, mealProteinGoal);
            const percentageFat = GetPercentageOfSmallValueInBigValue(totalFat, mealFatGoal);

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
                todaysWorkout: null
            }   
        }

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


        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
        // console.log('mealLogResult', mealLogResult);
        if(IsResultEmpty(mealLogResult)) return console.log('meal log has no data'); 
 

        
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
        // console.log('todaysWorkoutResult', todaysWorkoutResult);
        if(IsResultEmpty(todaysWorkoutResult)) return console.log('todays workout has no data'); 


        
        const mealCaloriesGoal = JSON.parse(mealCaloriesGoalResult);
        const mealCarbsGoal = JSON.parse(mealCarbsGoalResult);
        const mealProteinGoal = JSON.parse(mealProteinGoalResult);
        const mealFatGoal = JSON.parse(mealFatGoalResult);
        
        const mealLog = JSON.parse(mealLogResult);

        const totalCalories = parseInt(mealLog[mealLog.length - 1].totalCalories);
        const totalCarbs = parseInt(mealLog[mealLog.length - 1].totalCarbs);
        const totalProtein = parseInt(mealLog[mealLog.length - 1].totalProtein);
        const totalFat = parseInt(mealLog[mealLog.length - 1].totalFat);
        
        const todaysWorkout = JSON.parse(todaysWorkoutResult);

        // console.log('isMealSetup', isMealSetup);
        // console.log('userName', userName);
        // console.log('userWeight', userWeight);
        // console.log('mealCaloriesGoal', mealCaloriesGoal);
        // console.log('mealCarbsGoal', mealCarbsGoal);
        // console.log('mealProteinGoal', mealProteinGoal);
        // console.log('mealFatGoal', mealFatGoal);
        
        // console.log('mealLog', mealLog);
        
        // console.log('todaysWorkout', todaysWorkout);

        const percentageCalories = GetPercentageOfSmallValueInBigValue(totalCalories, mealCaloriesGoal);
        const percentageCarbs = GetPercentageOfSmallValueInBigValue(totalCarbs, mealCarbsGoal);
        const percentageProtein = GetPercentageOfSmallValueInBigValue(totalProtein, mealProteinGoal);
        const percentageFat = GetPercentageOfSmallValueInBigValue(totalFat, mealFatGoal);

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
