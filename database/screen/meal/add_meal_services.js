import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    MEAL_TOTAL_CALORIES,
    MEAL_TOTAL_CARBS,
    MEAL_TOTAL_PROTEIN,
    MEAL_TOTAL_FAT,
    MEAL_BREAKFAST_TOTAL_CALORIES,
    MEAL_BREAKFAST_TOTAL_CARBS,
    MEAL_BREAKFAST_TOTAL_PROTEIN,
    MEAL_BREAKFAST_TOTAL_FAT,
    MEAL_BREAKFAST_FOODS,
    MEAL_LUNCH_TOTAL_CALORIES,
    MEAL_LUNCH_TOTAL_CARBS,
    MEAL_LUNCH_TOTAL_PROTEIN,
    MEAL_LUNCH_TOTAL_FAT,
    MEAL_LUNCH_FOODS,
    MEAL_DINNER_TOTAL_CALORIES,
    MEAL_DINNER_TOTAL_CARBS,
    MEAL_DINNER_TOTAL_PROTEIN,
    MEAL_DINNER_TOTAL_FAT,
    MEAL_DINNER_FOODS
} from '../../database_stores';



async function setDataWithResult(store, result, value) {
    // console.log(`result ${result}`, result);
    if(JSON.parse(result) == null) {
        await AsyncStorage.setItem(store, JSON.stringify(value));
    }
    else {
        const sum = parseInt(value) + parseInt(JSON.parse(result));
        // console.log(`sum result ${result} with value ${value} = `, sum);
        await AsyncStorage.setItem(store, JSON.stringify(sum));
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
        if(meal_number == 1) { // BREAKFAST =====
            const breakfastCaloriesResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_CALORIES);
            const breakfastCarbsResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_CARBS);
            const breakfastProteinResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_PROTEIN);
            const breakfastFatResult = await AsyncStorage.getItem(MEAL_BREAKFAST_TOTAL_FAT);
            const breakfastfoodsResult = await AsyncStorage.getItem(MEAL_BREAKFAST_FOODS);
            
            await setDataWithResult(MEAL_BREAKFAST_TOTAL_CALORIES, breakfastCaloriesResult, calories);
            await setDataWithResult(MEAL_BREAKFAST_TOTAL_CARBS, breakfastCarbsResult, carbs);
            await setDataWithResult(MEAL_BREAKFAST_TOTAL_PROTEIN, breakfastProteinResult, protein);
            await setDataWithResult(MEAL_BREAKFAST_TOTAL_FAT, breakfastFatResult, fat);

            let breakfastfoods = JSON.parse(breakfastfoodsResult);
            // console.log('breakfast foods', breakfastfoods);
            breakfastfoods = addFoodToArray(breakfastfoods, {
                name: name,
                calories: calories,
                carbs: carbs,
                protein: protein,
                fat: fat
            });
            // console.log('breakfast foods after', breakfastfoods);
            await AsyncStorage.setItem(MEAL_BREAKFAST_FOODS, JSON.stringify(breakfastfoods));
        }
        if(meal_number == 2) { // LUNCH =====
            const lunchCaloriesResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_CALORIES);
            const lunchCarbsResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_CARBS);
            const lunchProteinResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_PROTEIN);
            const lunchFatResult = await AsyncStorage.getItem(MEAL_LUNCH_TOTAL_FAT);
            const lunchfoodsResult = await AsyncStorage.getItem(MEAL_LUNCH_FOODS);

            await setDataWithResult(MEAL_LUNCH_TOTAL_CALORIES, lunchCaloriesResult, calories);
            await setDataWithResult(MEAL_LUNCH_TOTAL_CARBS, lunchCarbsResult, carbs);
            await setDataWithResult(MEAL_LUNCH_TOTAL_PROTEIN, lunchProteinResult, protein);
            await setDataWithResult(MEAL_LUNCH_TOTAL_FAT, lunchFatResult, fat);    

            let lunchfoods = JSON.parse(lunchfoodsResult);
            // console.log('lunch foods', lunchfoods);
            lunchfoods = addFoodToArray(lunchfoods, {
                name: name,
                calories: calories,
                carbs: carbs,
                protein: protein,
                fat: fat
            });
            // console.log('lunch foods after', lunchfoods);
            await AsyncStorage.setItem(MEAL_LUNCH_FOODS, JSON.stringify(lunchfoods));
        }
        if(meal_number == 3) { // DINNER =====
            const dinnerCaloriesResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_CALORIES);
            const dinnerCarbsResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_CARBS);
            const dinnerProteinResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_PROTEIN);
            const dinnerFatResult = await AsyncStorage.getItem(MEAL_DINNER_TOTAL_FAT);
            const dinnerfoodsResult = await AsyncStorage.getItem(MEAL_DINNER_FOODS);

            await setDataWithResult(MEAL_DINNER_TOTAL_CALORIES, dinnerCaloriesResult, calories);
            await setDataWithResult(MEAL_DINNER_TOTAL_CARBS, dinnerCarbsResult, carbs);
            await setDataWithResult(MEAL_DINNER_TOTAL_PROTEIN, dinnerProteinResult, protein);
            await setDataWithResult(MEAL_DINNER_TOTAL_FAT, dinnerFatResult, fat); 

            let dinnerfoods = JSON.parse(dinnerfoodsResult);
            // console.log('dinner foods', dinnerfoods);
            dinnerfoods = addFoodToArray(dinnerfoods, {
                name: name,
                calories: calories,
                carbs: carbs,
                protein: protein,
                fat: fat
            });
            // console.log('dinner foods after', dinnerfoods);
            await AsyncStorage.setItem(MEAL_DINNER_FOODS, JSON.stringify(dinnerfoods));
        }

        // TOTALS =====
        const totalCaloriesResult = await AsyncStorage.getItem(MEAL_TOTAL_CALORIES);        
        const totalCarbsResult = await AsyncStorage.getItem(MEAL_TOTAL_CARBS);        
        const totalProteinResult = await AsyncStorage.getItem(MEAL_TOTAL_PROTEIN);        
        const totalFatResult = await AsyncStorage.getItem(MEAL_TOTAL_FAT);
        
        await setDataWithResult(MEAL_TOTAL_CALORIES, totalCaloriesResult, calories);
        await setDataWithResult(MEAL_TOTAL_CARBS, totalCarbsResult, carbs);
        await setDataWithResult(MEAL_TOTAL_PROTEIN, totalProteinResult, protein);
        await setDataWithResult(MEAL_TOTAL_FAT, totalFatResult, fat); 
        return;
    } catch (error) {
        console.log(error);
    }
}
