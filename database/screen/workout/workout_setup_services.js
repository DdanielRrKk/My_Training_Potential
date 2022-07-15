import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_STATE,
    WORKOUT_PLAN_NAME,
    WORKOUT_MONDAY,
    WORKOUT_TUESDAY,
    WORKOUT_WEDNESDAY,
    WORKOUT_THURSDAY,
    WORKOUT_FRIDAY,
    WORKOUT_SATURDAY,
    WORKOUT_SUNDAY,
    USER_INFO,
    USER_GOALS,
    MEAL_LOG,
    MEAL_BREAKFAST,
    MEAL_LUNCH,
    MEAL_DINNER
} from '../../database_stores';
import {
    calculateCalories,
    calculateCarbs,
    calculateProtein,
    calculateFat,
    calculateRecommendedCalories
} from '../../../helpers/mealCalculations';
import { getActivityLevelFromActiveDays } from '../../../helpers/helpers';
import { 
    SYSTEM_USER_SETUP,
    SYSTEM_USER_AND_MEAL_SETUP,
    SYSTEM_USER_AND_WORKOUT_SETUP,
    SYSTEM_ALL_SETUP 
} from '../../../helpers/constants';



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

        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user back', user);
        user.activityLevel = activity_level;
        await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));


        await AsyncStorage.setItem(WORKOUT_PLAN_NAME, plan_name);

        await AsyncStorage.setItem(WORKOUT_MONDAY, JSON.stringify(monday));
        await AsyncStorage.setItem(WORKOUT_TUESDAY, JSON.stringify(tuesday));
        await AsyncStorage.setItem(WORKOUT_WEDNESDAY, JSON.stringify(wednesday));
        await AsyncStorage.setItem(WORKOUT_THURSDAY, JSON.stringify(thursday));
        await AsyncStorage.setItem(WORKOUT_FRIDAY, JSON.stringify(friday));
        await AsyncStorage.setItem(WORKOUT_SATURDAY, JSON.stringify(saturday));
        await AsyncStorage.setItem(WORKOUT_SUNDAY, JSON.stringify(sunday));

        
        const systemStateResult = await AsyncStorage.getItem(SYSTEM_STATE);
        switch(parseInt(systemStateResult)) {
            case SYSTEM_USER_SETUP: await AsyncStorage.setItem(SYSTEM_STATE, JSON.stringify(SYSTEM_USER_AND_WORKOUT_SETUP)); break;
            case SYSTEM_USER_AND_MEAL_SETUP: await AsyncStorage.setItem(SYSTEM_STATE, JSON.stringify(SYSTEM_ALL_SETUP)); break;
            default: break;
        }



        const userGoalsResult = await AsyncStorage.getItem(USER_GOALS);
        const userGoals = JSON.parse(userGoalsResult);
        // console.log('userGoals', userGoals);

        const macros = calculateAllMacros(user.weight, user.height, user.age, user.gender, user.activityLevel, userGoals.mealGoal);
        const calories = parseInt(macros.calories);
        const carbs = parseInt(macros.carbs);
        const protein = parseInt(macros.protein);
        const fat = parseInt(macros.fat);

        // console.log('calories', calories);
        // console.log('carbs', carbs);
        // console.log('protein', protein);
        // console.log('fat', fat);

        userGoals.caloriesGoal = calories;
        userGoals.carbsGoal = carbs;
        userGoals.proteinGoal = protein;
        userGoals.fatGoal = fat;
        console.log('userGoals after', userGoals);
        await AsyncStorage.setItem(USER_GOALS, JSON.stringify(userGoals));



        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
        const mealLog = JSON.parse(mealLogResult);
        // console.log('mealLog back', mealLog);
        mealLog[mealLog.length - 1].caloriesGoal;
        mealLog[mealLog.length - 1].carbsGoal;
        mealLog[mealLog.length - 1].proteinGoal;
        mealLog[mealLog.length - 1].fatGoal;
        console.log('mealLog after', mealLog);
        await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(mealLog));



        const breakfastResult = await AsyncStorage.getItem(MEAL_BREAKFAST);
        const breakfast = JSON.parse(breakfastResult);
        // console.log('breakfast', breakfast);

        const lunchResult = await AsyncStorage.getItem(MEAL_LUNCH);
        const lunch = JSON.parse(lunchResult);
        // console.log('lunch', lunch);

        const dinnerResult = await AsyncStorage.getItem(MEAL_DINNER);
        const dinner = JSON.parse(dinnerResult);
        // console.log('dinner', dinner);

        const {
            breakfastRecommendedMin,
            breakfastRecommendedMax,
            lunchRecommendedMin,
            lunchRecommendedMax,
            dinnerRecommendedMin,
            dinnerRecommendedMax,
        } = calculateRecommendedCalories(calories);

        breakfast.recommendedMin = breakfastRecommendedMin;
        breakfast.recommendedMax = breakfastRecommendedMax;
        lunch.recommendedMin = lunchRecommendedMin;
        lunch.recommendedMax = lunchRecommendedMax;
        dinner.recommendedMin = dinnerRecommendedMin;
        dinner.recommendedMax = dinnerRecommendedMax;

        console.log('breakfast after', breakfast);
        console.log('lunch after', lunch);
        console.log('dinner after', dinner);
        await AsyncStorage.setItem(MEAL_BREAKFAST, JSON.stringify(breakfast));
        await AsyncStorage.setItem(MEAL_LUNCH, JSON.stringify(lunch));
        await AsyncStorage.setItem(MEAL_DINNER, JSON.stringify(dinner));
        return;
    } catch (error) {
        console.log('SetWorkoutPlan error');
        console.log(error);
    }
}
