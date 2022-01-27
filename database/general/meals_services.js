import AsyncStorage from '@react-native-async-storage/async-storage';



// add food
export async function AddFood(meal_store, food) {
    try {
        await AsyncStorage.getItem(meal_store, async (err, result) => {
            if (result == null || result == '') return; // object does not exist
            // object exists
            const meal = JSON.parse(result);
            meal.total_calories += food.calories;
            meal.total_carbs += food.carbs;
            meal.total_protein += food.protein;
            meal.total_fat += food.fat;
            meal.foods.push(food);

            await AsyncStorage.setItem(meal_store, JSON.stringify(meal));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

// remove food
export async function RemoveFood(meal_store, food_index) {
    try {
        await AsyncStorage.getItem(meal_store, async (err, result) => {
            if (result == null || result == '') return; // object does not exist
            // object exists
            const meal = JSON.parse(result);
            const food = meal[food_index];

            meal.total_calories -= food.calories;
            meal.total_carbs -= food.carbs;
            meal.total_protein -= food.protein;
            meal.total_fat -= food.fat;
            meal.foods.splice(food_index, 1);

            await AsyncStorage.setItem(meal_store, JSON.stringify(meal));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}