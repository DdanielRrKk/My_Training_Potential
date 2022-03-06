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
    MEAL_TOTAL_CALORIES,
    MEAL_TOTAL_CARBS,
    MEAL_TOTAL_PROTEIN,
    MEAL_TOTAL_FAT,
    MEAL_WATER,
    MEAL_BREAKFAST_RECOMMENDED_MIN,
    MEAL_BREAKFAST_RECOMMENDED_MAX,
    MEAL_BREAKFAST_TOTAL_CALORIES,
    MEAL_BREAKFAST_TOTAL_CARBS,
    MEAL_BREAKFAST_TOTAL_PROTEIN,
    MEAL_BREAKFAST_TOTAL_FAT,
    MEAL_BREAKFAST_FOODS,
    MEAL_LUNCH_RECOMMENDED_MIN,
    MEAL_LUNCH_RECOMMENDED_MAX,
    MEAL_LUNCH_TOTAL_CALORIES,
    MEAL_LUNCH_TOTAL_CARBS,
    MEAL_LUNCH_TOTAL_PROTEIN,
    MEAL_LUNCH_TOTAL_FAT,
    MEAL_LUNCH_FOODS,
    MEAL_DINNER_RECOMMENDED_MIN,
    MEAL_DINNER_RECOMMENDED_MAX,
    MEAL_DINNER_TOTAL_CALORIES,
    MEAL_DINNER_TOTAL_CARBS,
    MEAL_DINNER_TOTAL_PROTEIN,
    MEAL_DINNER_TOTAL_FAT,
    MEAL_DINNER_FOODS
} from '../../database_stores';
import { IsResultEmpty } from '../../../helpers/databaseValidations';
import {
    calculateCalories,
    calculateCarbs,
    calculateProtein,
    calculateFat,
    calculateRecommendedCalories
} from '../../../helpers/mealCalculations'



// get data for main meal screen
export async function GetMainMealScreenData() {
    try {
        const isMealSetupResult = await AsyncStorage.getItem(SYSTEM_IS_MEAL_SETUP);
        // console.log('isMealSetupResult', isMealSetupResult);
        if(IsResultEmpty(isMealSetupResult)) return console.log('system is meal setup has no data'); 
        
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

        const mealBreakfastCaloriesResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_CALORIES);
        // console.log('mealBreakfastCaloriesResult', mealBreakfastCaloriesResult);
        if(IsResultEmpty(mealBreakfastCaloriesResult)) return console.log('breakfast calories has no data'); 

        const mealLunchCaloriesResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_CALORIES);
        // console.log('mealLunchCaloriesResult', mealLunchCaloriesResult);
        if(IsResultEmpty(mealLunchCaloriesResult)) return console.log('lunch calories has no data'); 

        const mealDinnerCaloriesResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_CALORIES);
        // console.log('mealDinnerCaloriesResult', mealDinnerCaloriesResult);
        if(IsResultEmpty(mealDinnerCaloriesResult)) return console.log('dinner calories has no data'); 


        // store has data
        const isMealSetup = JSON.parse(isMealSetupResult);
        const mealCaloriesGoal = JSON.parse(mealCaloriesGoalResult);
        const mealCarbsGoal = JSON.parse(mealCarbsGoalResult);
        const mealProteinGoal = JSON.parse(mealProteinGoalResult);
        const mealFatGoal = JSON.parse(mealFatGoalResult);
        const mealBreakfastCalories = JSON.parse(mealBreakfastCaloriesResult);
        const mealLunchCalories = JSON.parse(mealLunchCaloriesResult);
        const mealDinnerCalories = JSON.parse(mealDinnerCaloriesResult);

        // console.log('isMealSetup', isMealSetup);
        // console.log('mealCaloriesGoal', mealCaloriesGoal);
        // console.log('mealCarbsGoal', mealCarbsGoal);
        // console.log('mealProteinGoal', mealProteinGoal);
        // console.log('mealFatGoal', mealFatGoal);
        // console.log('mealBreakfastCalories', mealBreakfastCalories);
        // console.log('mealLunchCalories', mealLunchCalories);
        // console.log('mealDinnerCalories', mealDinnerCalories);

        return {
            isMealReady: isMealSetup,
            calories: mealCaloriesGoal,
            carbs: mealCarbsGoal,
            protein: mealProteinGoal,
            fat: mealFatGoal,
            breakfastCalories: mealBreakfastCalories,
            lunchCalories: mealLunchCalories,
            dinnerCalories: mealDinnerCalories
        }        
    } catch (error) {
        console.log(error);
    }
}



function addFoodToArray(array, {name, calories, carbs, protein, fat}) {
    const tempArray = array;
    if(tempArray.length == 0) {
        tempArray.push({
            key: 1,
            name: name,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat
        });
    }
    else {
        const lastKey = parseInt(tempArray[tempArray.length - 1].key);
        tempArray.push({
            key: lastKey + 1,
            name: name,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat
        });
    }
    return tempArray;
}



export async function AddMealFoodData(meal_number, name, calories, carbs, protein, fat) {
    try {
        if(meal_number == 1) {
            const breakfastCaloriesResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_CALORIES);
            // console.log('breakfastCaloriesResult', breakfastCaloriesResult);
            if(IsResultEmpty(breakfastCaloriesResult)) return console.log('breakfast total calories has no data');

            const breakfastCarbsResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_CARBS);
            // console.log('breakfastCarbsResult', breakfastCarbsResult);
            if(IsResultEmpty(breakfastCarbsResult)) return console.log('breakfast total carbs has no data');

            const breakfastProteinResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_PROTEIN);
            // console.log('breakfastProteinResult', breakfastProteinResult);
            if(IsResultEmpty(breakfastProteinResult)) return console.log('breakfast total protein has no data');

            const breakfastFatResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_FAT);
            // console.log('breakfastFatResult', breakfastFatResult);
            if(IsResultEmpty(breakfastFatResult)) return console.log('breakfast total fat has no data');
        
            const breakfastfoodsResult = await AsyncStorage.getItem(MEAL_BREAKFAST_FOODS);
            // console.log('breakfastfoodsResult', breakfastfoodsResult);
            if(IsResultEmpty(breakfastfoodsResult)) return console.log('breakfast foods has no data');


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
            if(IsResultEmpty(totalFatResult)) return console.log('total fat has no data');


            // store has data
            let breakfastfoods = JSON.parse(breakfastfoodsResult);
            const sumBreakfastCalories = parseInt(calories) + parseInt(JSON.parse(breakfastCaloriesResult));
            const sumBreakfastCarbs = parseInt(carbs) + parseInt(JSON.parse(breakfastCarbsResult));
            const sumBreakfastProtein = parseInt(protein) + parseInt(JSON.parse(breakfastProteinResult));
            const sumBreakfastFat = parseInt(fat) + parseInt(JSON.parse(breakfastFatResult));

            const sumTotalCalories = parseInt(calories) + parseInt(JSON.parse(totalCaloriesResult));
            const sumTotalCarbs = parseInt(carbs) + parseInt(JSON.parse(totalCarbsResult));
            const sumTotalProtein = parseInt(protein) + parseInt(JSON.parse(totalProteinResult));
            const sumTotalFat = parseInt(fat) + parseInt(JSON.parse(totalFatResult));

            // console.log('breakfast foods', breakfastfoods);
            // console.log('sum breakfast calories', sumBreakfastCalories);
            // console.log('sum breakfast carbs', sumBreakfastCarbs);
            // console.log('sum breakfast protein', sumBreakfastProtein);
            // console.log('sum breakfast fat', sumBreakfastFat);
            
            // console.log('sum total calories', sumTotalCalories);
            // console.log('sum total carbs', sumTotalCarbs);
            // console.log('sum total protein', sumTotalProtein);
            // console.log('sum total fat', sumTotalFat);

            breakfastfoods = addFoodToArray(breakfastfoods, {
                name: name,
                calories: calories,
                carbs: carbs,
                protein: protein,
                fat: fat
            });
            // console.log('breakfast foods after', breakfastfoods);

            await AsyncStorage.setItem(MEAL_BREAKFAST_TOTAL_CALORIES, JSON.stringify(sumBreakfastCalories));
            await AsyncStorage.setItem(MEAL_BREAKFAST_TOTAL_CARBS, JSON.stringify(sumBreakfastCarbs));
            await AsyncStorage.setItem(MEAL_BREAKFAST_TOTAL_PROTEIN, JSON.stringify(sumBreakfastProtein));
            await AsyncStorage.setItem(MEAL_BREAKFAST_TOTAL_FAT, JSON.stringify(sumBreakfastFat));
            await AsyncStorage.setItem(MEAL_BREAKFAST_FOODS, JSON.stringify(breakfastfoods));

            await AsyncStorage.setItem(MEAL_TOTAL_CALORIES, JSON.stringify(sumBreakfastFat));
            await AsyncStorage.setItem(MEAL_TOTAL_CARBS, JSON.stringify(sumBreakfastFat));
            await AsyncStorage.setItem(MEAL_TOTAL_PROTEIN, JSON.stringify(sumBreakfastFat));
            await AsyncStorage.setItem(MEAL_TOTAL_FAT, JSON.stringify(sumBreakfastFat));
            return;
        }
        if(meal_number == 2) {
            const lunchCaloriesResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_CALORIES);
            // console.log('lunchcaloriesResult', lunchcaloriesResult);
            if(IsResultEmpty(lunchCaloriesResult)) return console.log('lunch total calories has no data');
        
            const lunchCarbsResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_CARBS);
            // console.log('lunchCarbsResult', lunchCarbsResult);
            if(IsResultEmpty(lunchCarbsResult)) return console.log('lunch total carbs has no data');

            const lunchProteinResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_PROTEIN);
            // console.log('lunchProteinResult', lunchProteinResult);
            if(IsResultEmpty(lunchProteinResult)) return console.log('lunch total protein has no data');

            const lunchFatResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_FAT);
            // console.log('lunchFatResult', lunchFatResult);
            if(IsResultEmpty(lunchFatResult)) return console.log('lunch total fat has no data');

            const lunchfoodsResult = await AsyncStorage.getItem(MEAL_LUNCH_FOODS);
            // console.log('lunchfoodsResult', lunchfoodsResult);
            if(IsResultEmpty(lunchfoodsResult)) return console.log('lunch foods has no data');

            
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
            if(IsResultEmpty(totalFatResult)) return console.log('total fat has no data');


            // store has data
            let lunchfoods = JSON.parse(lunchfoodsResult);
            const sumLunchCalories = parseInt(calories) + parseInt(JSON.parse(lunchCaloriesResult));
            const sumLunchCarbs = parseInt(carbs) + parseInt(JSON.parse(lunchCarbsResult));
            const sumLunchProtein = parseInt(protein) + parseInt(JSON.parse(lunchProteinResult));
            const sumLunchFat = parseInt(fat) + parseInt(JSON.parse(lunchFatResult));

            const sumTotalCalories = parseInt(calories) + parseInt(JSON.parse(totalCaloriesResult));
            const sumTotalCarbs = parseInt(carbs) + parseInt(JSON.parse(totalCarbsResult));
            const sumTotalProtein = parseInt(protein) + parseInt(JSON.parse(totalProteinResult));
            const sumTotalFat = parseInt(fat) + parseInt(JSON.parse(totalFatResult));

            // console.log('lunch foods', lunchfoods);
            // console.log('sum lunch calories', sumLunchCalories);
            // console.log('sum lunch carbs', sumLunchCarbs);
            // console.log('sum lunch protein', sumLunchProtein);
            // console.log('sum lunch fat', sumLunchFat);
            
            // console.log('sum total calories', sumTotalCalories);
            // console.log('sum total carbs', sumTotalCarbs);
            // console.log('sum total protein', sumTotalProtein);
            // console.log('sum total fat', sumTotalFat);

            lunchfoods = addFoodToArray(lunchfoods, {
                name: name,
                calories: calories,
                carbs: carbs,
                protein: protein,
                fat: fat
            });
            // console.log('lunch foods after', lunchfoods);

            await AsyncStorage.setItem(MEAL_LUNCH_TOTAL_CALORIES, JSON.stringify(sumLunchCalories));
            await AsyncStorage.setItem(MEAL_LUNCH_TOTAL_CARBS, JSON.stringify(sumLunchCarbs));
            await AsyncStorage.setItem(MEAL_LUNCH_TOTAL_PROTEIN, JSON.stringify(sumLunchProtein));
            await AsyncStorage.setItem(MEAL_LUNCH_TOTAL_FAT, JSON.stringify(sumLunchFat));
            await AsyncStorage.setItem(MEAL_LUNCH_FOODS, JSON.stringify(lunchfoods));
            
            await AsyncStorage.setItem(MEAL_TOTAL_CALORIES, JSON.stringify(sumBreakfastFat));
            await AsyncStorage.setItem(MEAL_TOTAL_CARBS, JSON.stringify(sumBreakfastFat));
            await AsyncStorage.setItem(MEAL_TOTAL_PROTEIN, JSON.stringify(sumBreakfastFat));
            await AsyncStorage.setItem(MEAL_TOTAL_FAT, JSON.stringify(sumBreakfastFat));
            return;
        }
        if(meal_number == 3) {
            const dinnercaloriesResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_CALORIES);
            // console.log('dinnercaloriesResult', dinnercaloriesResult);
            if(IsResultEmpty(dinnercaloriesResult)) return console.log('dinner total calories has no data');
        
            const dinnerCarbsResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_CARBS);
            // console.log('dinnerCarbsResult', dinnerCarbsResult);
            if(IsResultEmpty(dinnerCarbsResult)) return console.log('dinner total carbs has no data');

            const dinnerProteinResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_PROTEIN);
            // console.log('dinnerProteinResult', dinnerProteinResult);
            if(IsResultEmpty(dinnerProteinResult)) return console.log('dinner total protein has no data');

            const dinnerFatResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_FAT);
            // console.log('dinnerFatResult', dinnerFatResult);
            if(IsResultEmpty(dinnerFatResult)) return console.log('dinner total fat has no data');

            const dinnerfoodsResult = await AsyncStorage.getItem(MEAL_DINNER_FOODS);
            // console.log('dinnerfoodsResult', dinnerfoodsResult);
            if(IsResultEmpty(dinnerfoodsResult)) return console.log('dinner foods has no data');

            
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
            if(IsResultEmpty(totalFatResult)) return console.log('total fat has no data');


            // store has data
            let dinnerfoods = JSON.parse(dinnerfoodsResult);
            const sumDinnerCalories = parseInt(calories) + parseInt(JSON.parse(dinnercaloriesResult));
            const sumDinnerCarbs = parseInt(carbs) + parseInt(JSON.parse(dinnerCarbsResult));
            const sumDinnerProtein = parseInt(protein) + parseInt(JSON.parse(dinnerProteinResult));
            const sumDinnerFat = parseInt(fat) + parseInt(JSON.parse(dinnerFatResult));

            const sumTotalCalories = parseInt(calories) + parseInt(JSON.parse(totalCaloriesResult));
            const sumTotalCarbs = parseInt(carbs) + parseInt(JSON.parse(totalCarbsResult));
            const sumTotalProtein = parseInt(protein) + parseInt(JSON.parse(totalProteinResult));
            const sumTotalFat = parseInt(fat) + parseInt(JSON.parse(totalFatResult));

            // console.log('dinner foods', dinnerfoods);
            // console.log('sum dinner calories', sumDinnerCalories);
            // console.log('sum dinner carbs', sumDinnerCarbs);
            // console.log('sum dinner protein', sumDinnerProtein);
            // console.log('sum dinner fat', sumDinnerFat);

            // console.log('sum total calories', sumTotalCalories);
            // console.log('sum total carbs', sumTotalCarbs);
            // console.log('sum total protein', sumTotalProtein);
            // console.log('sum total fat', sumTotalFat);

            dinnerfoods = addFoodToArray(dinnerfoods, {
                name: name,
                calories: calories,
                carbs: carbs,
                protein: protein,
                fat: fat
            });
            // console.log('dinner foods after', dinnerfoods);

            await AsyncStorage.setItem(MEAL_DINNER_TOTAL_CALORIES, JSON.stringify(sumDinnerCalories));
            await AsyncStorage.setItem(MEAL_DINNER_TOTAL_CARBS, JSON.stringify(sumDinnerCarbs));
            await AsyncStorage.setItem(MEAL_DINNER_TOTAL_PROTEIN, JSON.stringify(sumDinnerProtein));
            await AsyncStorage.setItem(MEAL_DINNER_TOTAL_FAT, JSON.stringify(sumDinnerFat));
            await AsyncStorage.setItem(MEAL_DINNER_FOODS, JSON.stringify(dinnerfoods));
            
            await AsyncStorage.setItem(MEAL_TOTAL_CALORIES, JSON.stringify(sumBreakfastFat));
            await AsyncStorage.setItem(MEAL_TOTAL_CARBS, JSON.stringify(sumBreakfastFat));
            await AsyncStorage.setItem(MEAL_TOTAL_PROTEIN, JSON.stringify(sumBreakfastFat));
            await AsyncStorage.setItem(MEAL_TOTAL_FAT, JSON.stringify(sumBreakfastFat));
            return;
        }
    } catch (error) {
        console.log(error);
    }
}



export async function GetSingleMealScreenData(meal_number) {
    if(meal_number == 1) {
        const breakfastMinResult = await AsyncStorage.getItem(MEAL_BREAKFAST_RECOMMENDED_MIN);
        // console.log('breakfastMinResult', breakfastMinResult);
        if(IsResultEmpty(breakfastMinResult)) return console.log('breakfast recommended min has no data'); 

        const breakfastMaxResult = await AsyncStorage.getItem(MEAL_BREAKFAST_RECOMMENDED_MAX);
        // console.log('breakfastMaxResult', breakfastMaxResult);
        if(IsResultEmpty(breakfastMaxResult)) return console.log('breakfast recommended max has no data'); 

        const breakfastCaloriesResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_CALORIES);
        // console.log('breakfastCaloriesResult', breakfastCaloriesResult);
        if(IsResultEmpty(breakfastCaloriesResult)) return console.log('breakfast total calories has no data'); 

        const breakfastCarbsResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_CARBS);
        // console.log('breakfastCarbsResult', breakfastCarbsResult);
        if(IsResultEmpty(breakfastCarbsResult)) return console.log('breakfast total carbs has no data'); 

        const breakfastProteinResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_PROTEIN);
        // console.log('breakfastProteinResult', breakfastProteinResult);
        if(IsResultEmpty(breakfastProteinResult)) return console.log('breakfast total protein has no data'); 

        const breakfastFatResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_FAT);
        // console.log('breakfastFatResult', breakfastFatResult);
        if(IsResultEmpty(breakfastFatResult)) return console.log('breakfast total fat has no data'); 

        const breakfastFoodsResult = await AsyncStorage.getItem(MEAL_BREAKFAST_FOODS);
        // console.log('breakfastFoodsResult', breakfastFoodsResult);
        if(IsResultEmpty(breakfastFoodsResult)) return console.log('breakfast foods has no data'); 


        // store has data
        const recommendedMin = JSON.parse(breakfastMinResult);
        const recommendedMax = JSON.parse(breakfastMaxResult);
        const calories = JSON.parse(breakfastCaloriesResult);
        const carbs = JSON.parse(breakfastCarbsResult);
        const protein = JSON.parse(breakfastProteinResult);
        const fat = JSON.parse(breakfastFatResult);
        const foods = JSON.parse(breakfastFoodsResult);

        // console.log('recommendedMin', recommendedMin);
        // console.log('recommendedMax', recommendedMax);
        // console.log('calories', calories);
        // console.log('carbs', carbs);
        // console.log('protein', protein);
        // console.log('fat', fat);
        console.log('foods', foods);

        return {
            name: 'Breakfast',
            recommendedMin: recommendedMin,
            recommendedMax: recommendedMax,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat,
            foods: foods
        }
    }
    if(meal_number == 2) {
        const lunchMinResult = await AsyncStorage.getItem(MEAL_LUNCH_RECOMMENDED_MIN);
        // console.log('lunchMinResult', lunchMinResult);
        if(IsResultEmpty(lunchMinResult)) return console.log('lunch recommended min has no data'); 

        const lunchMaxResult = await AsyncStorage.getItem(MEAL_LUNCH_RECOMMENDED_MAX);
        // console.log('lunchMaxResult', lunchMaxResult);
        if(IsResultEmpty(lunchMaxResult)) return console.log('lunch recommended max has no data'); 

        const lunchCaloriesResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_CALORIES);
        // console.log('lunchCaloriesResult', lunchCaloriesResult);
        if(IsResultEmpty(lunchCaloriesResult)) return console.log('lunch total calories has no data'); 

        const lunchCarbsResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_CARBS);
        // console.log('lunchCarbsResult', lunchCarbsResult);
        if(IsResultEmpty(lunchCarbsResult)) return console.log('lunch total carbs has no data'); 

        const lunchProteinResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_PROTEIN);
        // console.log('lunchProteinResult', lunchProteinResult);
        if(IsResultEmpty(lunchProteinResult)) return console.log('lunch total protein has no data'); 

        const lunchFatResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_FAT);
        // console.log('lunchFatResult', lunchFatResult);
        if(IsResultEmpty(lunchFatResult)) return console.log('lunch total fat has no data'); 

        const lunchFoodsResult = await AsyncStorage.getItem(MEAL_LUNCH_FOODS);
        // console.log('lunchFoodsResult', lunchFoodsResult);
        if(IsResultEmpty(lunchFoodsResult)) return console.log('lunch foods has no data'); 


        // store has data
        const recommendedMin = JSON.parse(lunchMinResult);
        const recommendedMax = JSON.parse(lunchMaxResult);
        const calories = JSON.parse(lunchCaloriesResult);
        const carbs = JSON.parse(lunchCarbsResult);
        const protein = JSON.parse(lunchProteinResult);
        const fat = JSON.parse(lunchFatResult);
        const foods = JSON.parse(lunchFoodsResult);

        // console.log('recommendedMin', recommendedMin);
        // console.log('recommendedMax', recommendedMax);
        // console.log('calories', calories);
        // console.log('carbs', carbs);
        // console.log('protein', protein);
        // console.log('fat', fat);
        // console.log('foods', foods);

        return {
            name: 'Lunch',
            recommendedMin: recommendedMin,
            recommendedMax: recommendedMax,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat,
            foods: foods
        }
    }
    if(meal_number == 3) {
        const dinnerMinResult = await AsyncStorage.getItem(MEAL_DINNER_RECOMMENDED_MIN);
        // console.log('dinnerMinResult', dinnerMinResult);
        if(IsResultEmpty(dinnerMinResult)) return console.log('dinner recommended min has no data'); 

        const dinnerMaxResult = await AsyncStorage.getItem(MEAL_DINNER_RECOMMENDED_MAX);
        // console.log('dinnerMaxResult', dinnerMaxResult);
        if(IsResultEmpty(dinnerMaxResult)) return console.log('dinner recommended max has no data'); 

        const dinnerCaloriesResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_CALORIES);
        // console.log('dinnerCaloriesResult', dinnerCaloriesResult);
        if(IsResultEmpty(dinnerCaloriesResult)) return console.log('dinner total calories has no data'); 

        const dinnerCarbsResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_CARBS);
        // console.log('dinnerCarbsResult', dinnerCarbsResult);
        if(IsResultEmpty(dinnerCarbsResult)) return console.log('dinner total carbs has no data'); 

        const dinnerProteinResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_PROTEIN);
        // console.log('dinnerProteinResult', dinnerProteinResult);
        if(IsResultEmpty(dinnerProteinResult)) return console.log('dinner total protein has no data'); 

        const dinnerFatResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_FAT);
        // console.log('dinnerFatResult', dinnerFatResult);
        if(IsResultEmpty(dinnerFatResult)) return console.log('dinner total fat has no data'); 

        const dinnerFoodsResult = await AsyncStorage.getItem(MEAL_BREAKFAST_FOODS);
        // console.log('dinnerFoodsResult', dinnerFoodsResult);
        if(IsResultEmpty(dinnerFoodsResult)) return console.log('dinner foods has no data'); 


        // store has data
        const recommendedMin = JSON.parse(dinnerMinResult);
        const recommendedMax = JSON.parse(dinnerMaxResult);
        const calories = JSON.parse(dinnerCaloriesResult);
        const carbs = JSON.parse(dinnerCarbsResult);
        const protein = JSON.parse(dinnerProteinResult);
        const fat = JSON.parse(dinnerFatResult);
        const foods = JSON.parse(dinnerFoodsResult);

        // console.log('recommendedMin', recommendedMin);
        // console.log('recommendedMax', recommendedMax);
        // console.log('calories', calories);
        // console.log('carbs', carbs);
        // console.log('protein', protein);
        // console.log('fat', fat);
        // console.log('foods', foods);

        return {
            name: 'Dinner',
            recommendedMin: recommendedMin,
            recommendedMax: recommendedMax,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat,
            foods: foods
        }
    }
}



// setup meal goal screen
export async function SetMealGoal(goal) {
    try {
        await AsyncStorage.setItem(USER_MEAL_GOAL, JSON.stringify(goal));
    } catch (error) {
        console.log(error);
    }
}
export async function GetMealGoal() {
    try {
        const result = await AsyncStorage.getItem(USER_MEAL_GOAL);
        return (IsResultEmpty(result)) ? console.log('user meal goal has no data') : JSON.parse(result);
    } catch (error) {
        console.log(error);
    }
}

export async function SetActivityLevel(level) {
    try {
        await AsyncStorage.setItem(USER_ACTIVITY_LEVEL, JSON.stringify(level));
    } catch (error) {
        console.log(error);
    }
}
export async function GetActivityLevel() {
    try {
        const result = await AsyncStorage.getItem(USER_ACTIVITY_LEVEL);
        return (IsResultEmpty(result)) ? console.log('user activity level has no data') : JSON.parse(result);
    } catch (error) {
        console.log(error);
    }
}


export async function SetAndGetMealResults() {
    try {
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

        const activityLevelResult = await AsyncStorage.getItem(USER_ACTIVITY_LEVEL);
        // console.log('activityLevelResult', activityLevelResult);
        if(IsResultEmpty(activityLevelResult)) return console.log('user activity level has no data'); 

        const mealGoalResult = await AsyncStorage.getItem(USER_MEAL_GOAL);
        // console.log('mealGoalResult', mealGoalResult);
        if(IsResultEmpty(mealGoalResult)) return console.log('user meal goal has no data'); 


        // store has data
        const age = parseInt(JSON.parse(ageResult));
        const weight = parseInt(JSON.parse(weightResult));
        const height = parseInt(JSON.parse(heightResult));
        const gender = parseInt(JSON.parse(genderResult));
        const activityLevel = parseInt(JSON.parse(activityLevelResult));
        const mealGoal = parseInt(JSON.parse(mealGoalResult));

        // console.log('age', age);
        // console.log('weight', weight);
        // console.log('height', height);
        // console.log('gender', gender);
        // console.log('activityLevel', activityLevel);
        // console.log('mealGoal', mealGoal);


        const calories = parseInt(calculateCalories(weight, height, age, gender, activityLevel, mealGoal));
        const carbs = parseInt(calculateCarbs(weight, height, age, gender, activityLevel, mealGoal));
        const protein = parseInt(calculateProtein(weight, height, age, gender, activityLevel, mealGoal));
        const fat = parseInt(calculateFat(weight, height, age, gender, activityLevel, mealGoal));

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

        await AsyncStorage.setItem(SYSTEM_IS_MEAL_SETUP, JSON.stringify(true));
        return {
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat
        }
    } catch (error) {
        console.log(error);
    }
}
