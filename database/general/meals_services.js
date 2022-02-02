import AsyncStorage from '@react-native-async-storage/async-storage';



export async function setMealParameter(meal_store, param_number, parameter) {
    try {
        if(param_number == 0) { // add new meal
            await AsyncStorage.setItem(meal_store, JSON.stringify(parameter));
            return;
        }

        await AsyncStorage.getItem(meal_store, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const meal = JSON.parse(result);
            switch(param_number) {
                case 1: meal.recommended_min = parameter; break; // add / update meal recommended min calories
                case 2: meal.recommended_max = parameter; break; // add / update meal recommended max calories
                case 3: meal.total_calories = parameter; break; // add / update meal total calories
                case 4: meal.total_carbs = parameter; break; // add / update meal total carbs
                case 5: meal.total_protein = parameter; break; // add / update meal total protein
                case 6: meal.total_fat = parameter; break; // add / update meal total fat
                case 7: meal.foods = parameter; break; // add / update meal foods
                default: break;
            }
            await AsyncStorage.setItem(meal_store, JSON.stringify(meal));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

export async function getMealParameter(meal_store, param_number, setParameter) {
    try {
        await AsyncStorage.getItem(meal_store, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const meal = JSON.parse(result);
            switch(param_number) {
                case 0: setParameter(meal); break; // get meal
                case 1: setParameter(meal.recommended_min); break; // get meal recommended min calories
                case 2: setParameter(meal.recommended_max); break; // get meal recommended max calories
                case 3: setParameter(meal.total_calories); break; // get meal total calories
                case 4: setParameter(meal.total_carbs); break; // get meal total carbs
                case 5: setParameter(meal.total_protein); break; // get meal total protein
                case 6: setParameter(meal.total_fat); break; // get meal total fat
                case 7: setParameter(meal.foods); break; // get meal foods
                default: break;
            }
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

export async function addMealFood(
    meal_store, 
    food_name, 
    food_calories, 
    food_carbs, 
    food_protein, 
    food_fat
    ) {
    try {
        await AsyncStorage.getItem(meal_store, async (err, result) => {
            if (result == null || result == '') return; // object does not exist
            // object exists
            const meal = JSON.parse(result);

            meal.total_calories += food_calories;
            meal.total_carbs += food_carbs;
            meal.total_protein += food_protein;
            meal.total_fat += food_fat;

            if(meal.foods.length == 0) {
                meal.foods.push({
                    key: 1,
                    name: food_name,
                    calories: food_calories,
                    carbs: food_carbs,
                    protein: food_protein,
                    fat: food_fat
                });
            }
            else {
                let lastFoodKey = parseInt(meal.foods[meal.foods.length - 1].key);
                
                meal.foods.push({
                    key: lastFoodKey + 1,
                    name: food_name,
                    calories: food_calories,
                    carbs: food_carbs,
                    protein: food_protein,
                    fat: food_fat
                });
            }

            await AsyncStorage.setItem(meal_store, JSON.stringify(meal));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

export async function removeMealFood(meal_store, food_key) {
    try {
        await AsyncStorage.getItem(meal_store, async (err, result) => {
            if (result == null || result == '') return; // object does not exist
            // object exists
            const meal = JSON.parse(result);
            let foodIndex = undefined;

            meal.foods.find((food, index) => {
                if(food.key == food_key) {
                    meal.total_calories -= food.calories;
                    meal.total_carbs -= food.carbs;
                    meal.total_protein -= food.protein;
                    meal.total_fat -= food.fat;

                    foodIndex = index;
                    return true;
                }
            });
            if(foodIndex == undefined) return; // object not found

            meal.foods.splice(foodIndex, 1);

            await AsyncStorage.setItem(meal_store, JSON.stringify(meal));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}