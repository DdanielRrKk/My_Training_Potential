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

            if(meal.foods.length == 0) {
                food.key = 1;
                meal.foods.push(food);
            }
            else {
                let lastFoodKey = parseInt(meal.foods[meal.foods.length - 1].key);
                food.key = lastFoodKey + 1;
                meal.foods.push(food);
            }

            await AsyncStorage.setItem(meal_store, JSON.stringify(meal));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// remove food
export async function RemoveFood(meal_store, food_key) {
    try {
        await AsyncStorage.getItem(meal_store, async (err, result) => {
            if (result == null || result == '') return; // object does not exist
            // object exists
            const meal = JSON.parse(result);

            let arrayIndex = undefined;
            meal.find((value, index) => {
                if(value.key == food_key) {
                    arrayIndex = index;
                    return true;
                }
            });

            if(arrayIndex == undefined) {
                console.log('Object not found');
                return;
            }

            const food = meal[arrayIndex];

            meal.total_calories -= food.calories;
            meal.total_carbs -= food.carbs;
            meal.total_protein -= food.protein;
            meal.total_fat -= food.fat;
            meal.foods.splice(arrayIndex, 1);

            await AsyncStorage.setItem(meal_store, JSON.stringify(meal));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// add water
export async function AddWater(water_store, mililiters) {
    try {
        await AsyncStorage.getItem(water_store, async (err, result) => {
            if (result == null || result == '') return; // object does not exist
            // object exists
            const water = JSON.parse(result);
            water.mililiters += mililiters;

            await AsyncStorage.setItem(water_store, JSON.stringify(water));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// remove water
export async function RemoveWater(water_store, mililiters) {
    try {
        await AsyncStorage.getItem(water_store, async (err, result) => {
            if (result == null || result == '') return; // object does not exist
            // object exists
            const water = JSON.parse(result);
            water.mililiters -= mililiters;

            await AsyncStorage.setItem(water_store, JSON.stringify(water));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}