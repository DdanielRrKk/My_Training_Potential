import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_IS_WORKOUT_SETUP,
    WORKOUT_PLAN_NAME,
    WORKOUT_MONDAY,
    WORKOUT_TUESDAY,
    WORKOUT_WEDNESDAY,
    WORKOUT_THURSDAY,
    WORKOUT_FRIDAY,
    WORKOUT_SATURDAY,
    WORKOUT_SUNDAY,
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
    MEAL_BREAKFAST_RECOMMENDED_MIN,
    MEAL_BREAKFAST_RECOMMENDED_MAX,
    MEAL_LUNCH_RECOMMENDED_MIN,
    MEAL_LUNCH_RECOMMENDED_MAX,
    MEAL_DINNER_RECOMMENDED_MIN,
    MEAL_DINNER_RECOMMENDED_MAX,
} from '../../database_stores';
import { IsResultEmpty } from '../../../helpers/databaseValidations';
import {
    calculateCalories,
    calculateCarbs,
    calculateProtein,
    calculateFat,
    calculateRecommendedCalories
} from '../../../helpers/mealCalculations';



function getActivityLevelFromActiveDays(activeDays) {
    switch(activeDays){
        case 0: return 1;
        case 1: return 2;
        case 2: return 2;
        case 3: return 2;
        case 4: return 3;
        case 5: return 3;
        case 6: return 4;
        case 7: return 5;
        default: return 0;
    }
}

export async function SetWorkoutPlan(
    plan_name,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
) {
    try {
        let activeDays = 0;
        if(monday.name != null) activeDays++;
        if(tuesday.name != null) activeDays++;
        if(wednesday.name != null) activeDays++;
        if(thursday.name != null) activeDays++;
        if(friday.name != null) activeDays++;
        if(saturday.name != null) activeDays++;
        if(sunday.name != null) activeDays++;
        const activity_level = getActivityLevelFromActiveDays(activeDays);

        await AsyncStorage.setItem(USER_ACTIVITY_LEVEL, JSON.stringify(activity_level));

        await AsyncStorage.setItem(WORKOUT_PLAN_NAME, plan_name);

        await AsyncStorage.setItem(WORKOUT_MONDAY, JSON.stringify(monday));
        await AsyncStorage.setItem(WORKOUT_TUESDAY, JSON.stringify(tuesday));
        await AsyncStorage.setItem(WORKOUT_WEDNESDAY, JSON.stringify(wednesday));
        await AsyncStorage.setItem(WORKOUT_THURSDAY, JSON.stringify(thursday));
        await AsyncStorage.setItem(WORKOUT_FRIDAY, JSON.stringify(friday));
        await AsyncStorage.setItem(WORKOUT_SATURDAY, JSON.stringify(saturday));
        await AsyncStorage.setItem(WORKOUT_SUNDAY, JSON.stringify(sunday));

        await AsyncStorage.setItem(SYSTEM_IS_WORKOUT_SETUP, JSON.stringify(true));

        // recalculating meal goals
        const ageResult = await AsyncStorage.getItem(USER_AGE);
        // console.log('ageResult', ageResult);
        if(IsResultEmpty(ageResult)) return console.log('user age has no data'); 

        const weightResult = await AsyncStorage.getItem(USER_WEIGHT);
        // console.log('weightResult', weightResult);
        if(IsResultEmpty(weightResult)) return console.log('user weight has no data'); 
        
        const heightResult = await AsyncStorage.getItem(USER_HEIGHT);
        // console.log('heightResult', heightResult);
        if(IsResultEmpty(heightResult)) return console.log('user height has no data'); 

        const genderResult = await AsyncStorage.getItem(USER_GENDER);
        // console.log('genderResult', genderResult);
        if(IsResultEmpty(genderResult)) return console.log('user gender has no data'); 

        const mealGoalResult = await AsyncStorage.getItem(USER_MEAL_GOAL);
        // console.log('mealGoalResult', mealGoalResult);
        if(IsResultEmpty(mealGoalResult)) return console.log('user meal goal has no data'); 


        // store has data
        const age = parseInt(JSON.parse(ageResult));
        const weight = parseInt(JSON.parse(weightResult));
        const height = parseInt(JSON.parse(heightResult));
        const gender = parseInt(JSON.parse(genderResult));
        const mealGoal = parseInt(JSON.parse(mealGoalResult));

        // console.log('age', age);
        // console.log('weight', weight);
        // console.log('height', height);
        // console.log('gender', gender);
        // console.log('mealGoal', mealGoal);


        const calories = parseInt(calculateCalories(weight, height, age, gender, activity_level, mealGoal));
        const carbs = parseInt(calculateCarbs(weight, height, age, gender, activity_level, mealGoal));
        const protein = parseInt(calculateProtein(weight, height, age, gender, activity_level, mealGoal));
        const fat = parseInt(calculateFat(weight, height, age, gender, activity_level, mealGoal));

        // console.log('calories', calories);
        // console.log('carbs', carbs);
        // console.log('protein', protein);
        // console.log('fat', fat);


        const {
            breakfastRecommendedMin,
            breakfastRecommendedMax,
            lunchRecommendedMin,
            lunchRecommendedMax,
            dinnerRecommendedMin,
            dinnerRecommendedMax,
        } = calculateRecommendedCalories(calories);


        await AsyncStorage.setItem(USER_CALORIES_GOAL, JSON.stringify(calories));
        await AsyncStorage.setItem(USER_CARBS_GOAL, JSON.stringify(carbs));
        await AsyncStorage.setItem(USER_PROTEIN_GOAL, JSON.stringify(protein));
        await AsyncStorage.setItem(USER_FAT_GOAL, JSON.stringify(fat));

        await AsyncStorage.setItem(MEAL_BREAKFAST_RECOMMENDED_MIN, JSON.stringify(breakfastRecommendedMin));
        await AsyncStorage.setItem(MEAL_BREAKFAST_RECOMMENDED_MAX, JSON.stringify(breakfastRecommendedMax));
        await AsyncStorage.setItem(MEAL_LUNCH_RECOMMENDED_MIN, JSON.stringify(lunchRecommendedMin));
        await AsyncStorage.setItem(MEAL_LUNCH_RECOMMENDED_MAX, JSON.stringify(lunchRecommendedMax));
        await AsyncStorage.setItem(MEAL_DINNER_RECOMMENDED_MIN, JSON.stringify(dinnerRecommendedMin));
        await AsyncStorage.setItem(MEAL_DINNER_RECOMMENDED_MAX, JSON.stringify(dinnerRecommendedMax));
        return;
    } catch (error) {
        console.log(error);
    }
}
