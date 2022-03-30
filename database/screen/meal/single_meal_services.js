import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    MEAL_TOTAL_CALORIES,
    MEAL_TOTAL_CARBS,
    MEAL_TOTAL_PROTEIN,
    MEAL_TOTAL_FAT,
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
import { IsResultEmpty } from '../../../helpers/validations';



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
        // console.log('foods', foods);

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

        const dinnerCaloriesResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_CALORIES);
        // console.log('dinnerCaloriesResult', dinnerCaloriesResult);
        if(IsResultEmpty(dinnerCaloriesResult)) return console.log('dinner total calories has no data'); 

        const dinnerCarbsResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_CARBS);
        // console.log('dinnerCarbsResult', dinnerCarbsResult);
        if(IsResultEmpty(dinnerCarbsResult)) return console.log('dinner total carbs has no data'); 

        const dinnerProteinResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_PROTEIN);
        // console.log('dinnerProteinResult', dinnerProteinResult);
        if(IsResultEmpty(dinnerProteinResult)) return console.log('dinner total protein has no data'); 

        const dinnerFatResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_FAT);
        // console.log('dinnerFatResult', dinnerFatResult);
        if(IsResultEmpty(dinnerFatResult)) return console.log('dinner total fat has no data'); 

        const dinnerFoodsResult = await AsyncStorage.getItem(MEAL_DINNER_FOODS);
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



async function removeDataWithResult(store, result, value) {
    // console.log(`result ${result}`, result);
    if(JSON.parse(result) == null || (parseInt(JSON.parse(result)) - value) <= 0) {
        await AsyncStorage.setItem(store, JSON.stringify(0));
    }
    else {
        const sum = parseInt(JSON.parse(result)) - parseInt(value);
        // console.log(`sum result ${result} with value ${value} = `, sum);
        await AsyncStorage.setItem(store, JSON.stringify(sum));
    }
}

export async function RemoveMealFoodData(meal_number, food_key) {
    try {
        // TOTALS =====
        const totalCaloriesResult = await AsyncStorage.getItem(MEAL_TOTAL_CALORIES);        
        const totalCarbsResult = await AsyncStorage.getItem(MEAL_TOTAL_CARBS);        
        const totalProteinResult = await AsyncStorage.getItem(MEAL_TOTAL_PROTEIN);        
        const totalFatResult = await AsyncStorage.getItem(MEAL_TOTAL_FAT);

        if(meal_number == 1) { // BREAKFAST =====
            const breakfastCaloriesResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_CALORIES);
            const breakfastCarbsResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_CARBS);
            const breakfastProteinResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_PROTEIN);
            const breakfastFatResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_FAT);

            const breakfastFoodsResult = await AsyncStorage.getItem(MEAL_BREAKFAST_FOODS);
            // console.log('breakfastFoodsResult', breakfastFoodsResult);

            let foodIndex = undefined;
            const breakfastFoods = JSON.parse(breakfastFoodsResult);
            // console.log('breakfast foods', breakfastfoods);

            breakfastFoods.find((food, index) => {
                if(food.key == food_key) {
                    foodIndex = index;
                    return true;
                }
            });
            if(foodIndex == undefined) return; // object not found

            const {calories, carbs, protein, fat} = breakfastFoods[foodIndex];

            removeDataWithResult(MEAL_BREAKFAST_TOTAL_CALORIES, breakfastCaloriesResult, calories);
            removeDataWithResult(MEAL_BREAKFAST_TOTAL_CARBS, breakfastCarbsResult, carbs);
            removeDataWithResult(MEAL_BREAKFAST_TOTAL_PROTEIN, breakfastProteinResult, protein);
            removeDataWithResult(MEAL_BREAKFAST_TOTAL_FAT, breakfastFatResult, fat);

            removeDataWithResult(MEAL_TOTAL_CALORIES, totalCaloriesResult, calories);
            removeDataWithResult(MEAL_TOTAL_CARBS, totalCarbsResult, carbs);
            removeDataWithResult(MEAL_TOTAL_PROTEIN, totalProteinResult, protein);
            removeDataWithResult(MEAL_TOTAL_FAT, totalFatResult, fat);
    
            breakfastFoods.splice(foodIndex, 1);
            // console.log('breakfast foods after', breakfastFoods);
            await AsyncStorage.setItem(MEAL_BREAKFAST_FOODS, JSON.stringify(breakfastFoods));
            return;
        }
        if(meal_number == 2) { // LUNCH =====
            const lunchCaloriesResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_CALORIES);
            const lunchCarbsResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_CARBS);
            const lunchProteinResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_PROTEIN);
            const lunchFatResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_FAT);
            const lunchFoodsResult = await AsyncStorage.getItem(MEAL_LUNCH_FOODS);

            let foodIndex = undefined;
            const lunchFoods = JSON.parse(lunchFoodsResult);
            // console.log('lunch foods', lunchFoods);

            lunchFoods.find((food, index) => {
                if(food.key == food_key) {
                    foodIndex = index;
                    return true;
                }
            });
            if(foodIndex == undefined) return; // object not found

            const {calories, carbs, protein, fat} = lunchFoods[foodIndex];

            removeDataWithResult(MEAL_LUNCH_TOTAL_CALORIES, lunchCaloriesResult, calories);
            removeDataWithResult(MEAL_LUNCH_TOTAL_CARBS, lunchCarbsResult, carbs);
            removeDataWithResult(MEAL_LUNCH_TOTAL_PROTEIN, lunchProteinResult, protein);
            removeDataWithResult(MEAL_LUNCH_TOTAL_FAT, lunchFatResult, fat);

            removeDataWithResult(MEAL_TOTAL_CALORIES, totalCaloriesResult, calories);
            removeDataWithResult(MEAL_TOTAL_CARBS, totalCarbsResult, carbs);
            removeDataWithResult(MEAL_TOTAL_PROTEIN, totalProteinResult, protein);
            removeDataWithResult(MEAL_TOTAL_FAT, totalFatResult, fat);   

            lunchFoods.splice(foodIndex, 1);
            // console.log('lunch foods after', lunchfoods);
            await AsyncStorage.setItem(MEAL_LUNCH_FOODS, JSON.stringify(lunchFoods));
            return;
        }
        if(meal_number == 3) { // DINNER =====
            const dinnerCaloriesResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_CALORIES);
            const dinnerCarbsResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_CARBS);
            const dinnerProteinResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_PROTEIN);
            const dinnerFatResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_FAT);
            const dinnerFoodsResult = await AsyncStorage.getItem(MEAL_DINNER_FOODS);

            let foodIndex = undefined;
            const dinnerFoods = JSON.parse(dinnerFoodsResult);
            // console.log('dinner foods', dinnerFoods);

            dinnerFoods.find((food, index) => {
                if(food.key == food_key) {
                    foodIndex = index;
                    return true;
                }
            });
            if(foodIndex == undefined) return; // object not found

            const {calories, carbs, protein, fat} = dinnerFoods[foodIndex];

            removeDataWithResult(MEAL_DINNER_TOTAL_CALORIES, dinnerCaloriesResult, calories);
            removeDataWithResult(MEAL_DINNER_TOTAL_CARBS, dinnerCarbsResult, carbs);
            removeDataWithResult(MEAL_DINNER_TOTAL_PROTEIN, dinnerProteinResult, protein);
            removeDataWithResult(MEAL_DINNER_TOTAL_FAT, dinnerFatResult, fat);

            removeDataWithResult(MEAL_TOTAL_CALORIES, totalCaloriesResult, calories);
            removeDataWithResult(MEAL_TOTAL_CARBS, totalCarbsResult, carbs);
            removeDataWithResult(MEAL_TOTAL_PROTEIN, totalProteinResult, protein);
            removeDataWithResult(MEAL_TOTAL_FAT, totalFatResult, fat);   

            dinnerFoods.splice(foodIndex, 1);
            // console.log('dinner foods after', dinnerfoods);
            await AsyncStorage.setItem(MEAL_DINNER_FOODS, JSON.stringify(dinnerFoods));
            return;
        }
    } catch (error) {
        console.log(error);
    }
}
