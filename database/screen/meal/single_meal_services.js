import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    MEAL_BREAKFAST,
    MEAL_LUNCH,
    MEAL_DINNER,
    MEAL_LOG
} from '../../database_stores';



export async function GetBreakfastData() {
    try {
        const breakfastResult = await AsyncStorage.getItem(MEAL_BREAKFAST);
        const breakfast = JSON.parse(breakfastResult);
        console.log('breakfast', breakfast);
        return {
            name: 'Breakfast',
            recommendedMin: breakfast.recommendedMin,
            recommendedMax: breakfast.recommendedMax,
            calories: breakfast.totalCalories,
            carbs: breakfast.totalCarbs,
            protein: breakfast.totalProtein,
            fat: breakfast.totalFat,
            foods: breakfast.foods
        };
    } catch (error) {
        console.log('GetBreakfastData error');
        console.log(error);
    }
}

export async function GetLunchData() {
    try {
        const lunchResult = await AsyncStorage.getItem(MEAL_LUNCH);
        const lunch = JSON.parse(lunchResult);
        // console.log('lunch', lunch);
        return {
            name: 'Lunch',
            recommendedMin: lunch.recommendedMin,
            recommendedMax: lunch.recommendedMax,
            calories: lunch.totalCalories,
            carbs: lunch.totalCarbs,
            protein: lunch.totalProtein,
            fat: lunch.totalFat,
            foods: lunch.foods
        };
    } catch (error) {
        console.log('GetLunchData error');
        console.log(error);
    }
}

export async function GetDinnerData() {
    try {
        const dinnerResult = await AsyncStorage.getItem(MEAL_DINNER);
        const dinner = JSON.parse(dinnerResult);
        // console.log('dinner', dinner);
        return {
            name: 'Dinner',
            recommendedMin: dinner.recommendedMin,
            recommendedMax: dinner.recommendedMax,
            calories: dinner.totalCalories,
            carbs: dinner.totalCarbs,
            protein: dinner.totalProtein,
            fat: dinner.totalFat,
            foods: dinner.foods
        };
    } catch (error) {
        console.log('GetDinnerData error');
        console.log(error);
    }
}



export async function RemoveBreakfastFoodData(food_key) {
    try {
        const breakfastResult = await AsyncStorage.getItem(MEAL_BREAKFAST);
        const breakfast = JSON.parse(breakfastResult);
        // console.log('breakfast', breakfast);
        let foodIndex = undefined;
        breakfast.foods.find((food, index) => {
            if(food.key == food_key) {
                foodIndex = index;
                return true;
            }
        });
        if(foodIndex == undefined) return console.log('object not found');
        const {calories, carbs, protein, fat} = breakfast.foods[foodIndex];

        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
        const mealLog = JSON.parse(mealLogResult);
        // console.log('mealLog', mealLog);
        const totalCalories = parseInt(mealLog[mealLog.length - 1].totalCalories);
        const totalCarbs = parseInt(mealLog[mealLog.length - 1].totalCarbs);
        const totalProtein = parseInt(mealLog[mealLog.length - 1].totalProtein);
        const totalFat = parseInt(mealLog[mealLog.length - 1].totalFat);

        mealLog[mealLog.length - 1].totalCalories = (totalCalories == 0) ? 0 : totalCalories - calories;
        mealLog[mealLog.length - 1].totalCarbs = (totalCarbs == 0) ? 0 : totalCarbs - carbs;
        mealLog[mealLog.length - 1].totalProtein = (totalProtein == 0) ? 0 : totalProtein - protein;
        mealLog[mealLog.length - 1].totalFat = (totalFat == 0) ? 0 : totalFat - fat;
        // console.log('mealLog', mealLog);
        await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(mealLog));
        
        breakfast.foods.splice(foodIndex, 1);
        breakfast.totalCalories = breakfast.totalCalories - calories;
        breakfast.totalCarbs = breakfast.totalCarbs - carbs;
        breakfast.totalProtein = breakfast.totalProtein - protein;
        breakfast.totalFat = breakfast.totalFat - fat;
        // console.log('breakfast foods after', breakfast.foods);
        await AsyncStorage.setItem(MEAL_BREAKFAST, JSON.stringify(breakfast));
        return;
    } catch (error) {
        console.log('RemoveBreakfastFoodData error');
        console.log(error);
    }
}

export async function RemoveLunchFoodData(food_key) {
    try {
        const lunchResult = await AsyncStorage.getItem(MEAL_LUNCH);
        const lunch = JSON.parse(lunchResult);
        // console.log('lunch', lunch);
        let foodIndex = undefined;
        lunch.foods.find((food, index) => {
            if(food.key == food_key) {
                foodIndex = index;
                return true;
            }
        });
        if(foodIndex == undefined) return console.log('object not found');
        const {calories, carbs, protein, fat} = lunch.foods[foodIndex];

        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
        const mealLog = JSON.parse(mealLogResult);
        // console.log('mealLog', mealLog);
        const totalCalories = parseInt(mealLog[mealLog.length - 1].totalCalories);
        const totalCarbs = parseInt(mealLog[mealLog.length - 1].totalCarbs);
        const totalProtein = parseInt(mealLog[mealLog.length - 1].totalProtein);
        const totalFat = parseInt(mealLog[mealLog.length - 1].totalFat);

        mealLog[mealLog.length - 1].totalCalories = (totalCalories == 0) ? 0 : totalCalories - calories;
        mealLog[mealLog.length - 1].totalCarbs = (totalCarbs == 0) ? 0 : totalCarbs - carbs;
        mealLog[mealLog.length - 1].totalProtein = (totalProtein == 0) ? 0 : totalProtein - protein;
        mealLog[mealLog.length - 1].totalFat = (totalFat == 0) ? 0 : totalFat - fat;
        // console.log('mealLog', mealLog);
        await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(mealLog));
        
        lunch.foods.splice(foodIndex, 1);
        // console.log('lunch foods after', lunch.foods);
        await AsyncStorage.setItem(MEAL_LUNCH, JSON.stringify(lunch));
        return;
    } catch (error) {
        console.log('RemoveLunchFoodData error');
        console.log(error);
    }
}

export async function RemoveDinnerFoodData(food_key) {
    try {
        const dinnerResult = await AsyncStorage.getItem(MEAL_DINNER);
        const dinner = JSON.parse(dinnerResult);
        // console.log('dinner', dinner);
        let foodIndex = undefined;
        dinner.foods.find((food, index) => {
            if(food.key == food_key) {
                foodIndex = index;
                return true;
            }
        });
        if(foodIndex == undefined) return console.log('object not found');
        const {calories, carbs, protein, fat} = dinner.foods[foodIndex];

        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
        const mealLog = JSON.parse(mealLogResult);
        // console.log('mealLog', mealLog);
        const totalCalories = parseInt(mealLog[mealLog.length - 1].totalCalories);
        const totalCarbs = parseInt(mealLog[mealLog.length - 1].totalCarbs);
        const totalProtein = parseInt(mealLog[mealLog.length - 1].totalProtein);
        const totalFat = parseInt(mealLog[mealLog.length - 1].totalFat);

        mealLog[mealLog.length - 1].totalCalories = (totalCalories == 0) ? 0 : totalCalories - calories;
        mealLog[mealLog.length - 1].totalCarbs = (totalCarbs == 0) ? 0 : totalCarbs - carbs;
        mealLog[mealLog.length - 1].totalProtein = (totalProtein == 0) ? 0 : totalProtein - protein;
        mealLog[mealLog.length - 1].totalFat = (totalFat == 0) ? 0 : totalFat - fat;
        // console.log('mealLog', mealLog);
        await AsyncStorage.setItem(MEAL_LOG, JSON.stringify(mealLog));
        
        dinner.foods.splice(foodIndex, 1);
        // console.log('dinner foods after', dinner.foods);
        await AsyncStorage.setItem(MEAL_DINNER, JSON.stringify(dinner));
        return;
    } catch (error) {
        console.log('RemoveDinnerFoodData error');
        console.log(error);
    }
}
