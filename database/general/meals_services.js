import AsyncStorage from '@react-native-async-storage/async-storage';



export async function setMealParameter(meal_store, param_number, parameter) {
    try {
        const result = await AsyncStorage.getItem(meal_store);
        if(result == null || result == '') return console.log('object has no data'); // object has no data

        if(param_number == 0) {
            await AsyncStorage.setItem(meal_store, JSON.stringify(parameter));
            return;
        }

        const meal = JSON.parse(result);
        switch(param_number) {
            case 1: meal.recommended_min = parameter; break; 
            case 2: meal.recommended_max = parameter; break; 
            case 3: meal.total_calories = parameter; break;
            case 4: meal.total_carbs = parameter; break; 
            case 5: meal.total_protein = parameter; break; 
            case 6: meal.total_fat = parameter; break; 
            case 7: meal.foods = parameter; break; 
            default: break;
        }
        await AsyncStorage.setItem(meal_store, JSON.stringify(meal));
        return;
    } catch (error) {
        console.log(error);
    }
}



export async function getMealParameter(meal_store, param_number) {
    try {
        const result = await AsyncStorage.getItem(meal_store);
        if(result == null || result == '') return console.log('object has no data');

        const meal = JSON.parse(result);
        if(param_number == 0) return meal;
        if(param_number == 1) return meal.recommended_min;
        if(param_number == 2) return meal.recommended_max;
        if(param_number == 3) return meal.total_calories;
        if(param_number == 4) return meal.total_carbs;
        if(param_number == 5) return meal.total_protein;
        if(param_number == 6) return meal.total_fat;
        if(param_number == 7) return meal.foods;
        return console.log('not found');
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
        const result = await AsyncStorage.getItem(meal_store);
        if(result == null || result == '') return console.log('object has no data');

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
            const lastFoodKey = parseInt(meal.foods[meal.foods.length - 1].key);
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
    } catch (error) {
        console.log(error);
    }
}

export async function removeMealFood(meal_store, food_key) {
    try {
        const result = await AsyncStorage.getItem(meal_store);
        if(result == null || result == '') return console.log('object has no data');

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
    } catch (error) {
        console.log(error);
    }
}