import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    MEAL_BREAKFAST,
    MEAL_LUNCH,
    MEAL_DINNER,
    MEAL_LOG
} from '../../database_stores';



export async function AddBreakfastFoodData(name, calories, carbs, protein, fat) {
    try {
        const breakfastResult = await AsyncStorage.getItem(MEAL_BREAKFAST);
        const breakfast = JSON.parse(breakfastResult);
        // console.log('breakfast', breakfast);
        breakfast.totalCalories = breakfast.totalCalories + calories;
        breakfast.totalCarbs = breakfast.totalCarbs + carbs;
        breakfast.totalProtein = breakfast.totalProtein + protein;
        breakfast.totalFat = breakfast.totalFat + fat;

        const lastKey = (breakfast.foods.length == 0) ? 1 : breakfast.foods[breakfast.foods.length - 1].key + 1;
        breakfast.foods = [...breakfast.foods, {
            key: lastKey,
            name: name,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat
        }];
        // console.log('breakfast foods after', breakfast.foods);
        await AsyncStorage.setItem(MEAL_BREAKFAST, JSON.stringify(breakfast));

        
        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
        const mealLog = JSON.parse(mealLogResult);
        // console.log('mealLog', mealLog);
        mealLog[mealLog.length - 1].totalCalories = mealLog[mealLog.length - 1].totalCalories + calories;
        mealLog[mealLog.length - 1].totalCarbs = mealLog[mealLog.length - 1].totalCarbs + carbs;
        mealLog[mealLog.length - 1].totalProtein = mealLog[mealLog.length - 1].totalProtein + protein;
        mealLog[mealLog.length - 1].totalFat = mealLog[mealLog.length - 1].totalFat + fat;
        // console.log('mealLog[mealLog.length - 1]', mealLog[mealLog.length - 1]);
        await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(mealLog));
        return;
    } catch (error) {
        console.log('AddBreakfastFoodData error');
        console.log(error);
    }
}

export async function AddLunchFoodData(name, calories, carbs, protein, fat) {
    try {
        const lunchResult = await AsyncStorage.getItem(MEAL_LUNCH);
        const lunch = JSON.parse(lunchResult);
        // console.log('lunch', lunch);
        lunch.totalCalories = lunch.totalCalories + calories;
        lunch.totalCarbs = lunch.totalCarbs + carbs;
        lunch.totalProtein = lunch.totalProtein + protein;
        lunch.totalFat = lunch.totalFat + fat;

        const lastKey = (lunch.foods.length == 0) ? 1 : lunch.foods[lunch.foods.length - 1].key + 1;
        lunch.foods = [...lunch.foods, {
            key: lastKey,
            name: name,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat
        }];
        // console.log('lunch foods after', lunch.foods);
        await AsyncStorage.setItem(MEAL_LUNCH, JSON.stringify(lunch));

        
        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
        const mealLog = JSON.parse(mealLogResult);
        // console.log('mealLog', mealLog);
        mealLog[mealLog.length - 1].totalCalories = mealLog[mealLog.length - 1].totalCalories + calories;
        mealLog[mealLog.length - 1].totalCarbs = mealLog[mealLog.length - 1].totalCarbs + carbs;
        mealLog[mealLog.length - 1].totalProtein = mealLog[mealLog.length - 1].totalProtein + protein;
        mealLog[mealLog.length - 1].totalFat = mealLog[mealLog.length - 1].totalFat + fat;
        // console.log('mealLog[mealLog.length - 1]', mealLog[mealLog.length - 1]);
        await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(mealLog));
        return;
    } catch (error) {
        console.log('AddLunchFoodData error');
        console.log(error);
    }
}

export async function AddDinnerFoodData(name, calories, carbs, protein, fat) {
    try {
        const dinnerResult = await AsyncStorage.getItem(MEAL_DINNER);
        const dinner = JSON.parse(dinnerResult);
        // console.log('dinner', dinner);
        dinner.totalCalories = dinner.totalCalories + calories;
        dinner.totalCarbs = dinner.totalCarbs + carbs;
        dinner.totalProtein = dinner.totalProtein + protein;
        dinner.totalFat = dinner.totalFat + fat;

        const lastKey = (dinner.foods.length == 0) ? 1 : dinner.foods[dinner.foods.length - 1].key + 1;
        dinner.foods = [...dinner.foods, {
            key: lastKey,
            name: name,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat
        }];
        // console.log('dinner foods after', dinner.foods);
        await AsyncStorage.setItem(MEAL_DINNER, JSON.stringify(dinner));

        
        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
        const mealLog = JSON.parse(mealLogResult);
        // console.log('mealLog', mealLog);
        mealLog[mealLog.length - 1].totalCalories = mealLog[mealLog.length - 1].totalCalories + calories;
        mealLog[mealLog.length - 1].totalCarbs = mealLog[mealLog.length - 1].totalCarbs + carbs;
        mealLog[mealLog.length - 1].totalProtein = mealLog[mealLog.length - 1].totalProtein + protein;
        mealLog[mealLog.length - 1].totalFat = mealLog[mealLog.length - 1].totalFat + fat;
        // console.log('mealLog[mealLog.length - 1]', mealLog[mealLog.length - 1]);
        await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(mealLog));
        return;
    } catch (error) {
        console.log('AddDinnerFoodData error');
        console.log(error);
    }
}
