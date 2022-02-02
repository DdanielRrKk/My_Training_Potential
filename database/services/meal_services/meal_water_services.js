import AsyncStorage from '@react-native-async-storage/async-storage';
import { MEAL_WATER_STORE } from "../../database_stores";
import { MEAL_WATER_SCHEMA } from '../../database_shemas';



// add water
export async function AddWater(mililiters) {
    try {
        await AsyncStorage.getItem(MEAL_WATER_STORE, async (err, result) => {
            if (result == null || result == '') return; // object does not exist
            // object exists
            const water = JSON.parse(result);
            water.mililiters += mililiters;
            await AsyncStorage.setItem(MEAL_WATER_STORE, JSON.stringify(water));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}
// remove water
export async function RemoveWater(mililiters) {
    try {
        await AsyncStorage.getItem(MEAL_WATER_STORE, async (err, result) => {
            if (result == null || result == '') return; // object does not exist
            // object exists
            const water = JSON.parse(result);
            water.mililiters -= mililiters;
            await AsyncStorage.setItem(MEAL_WATER_STORE, JSON.stringify(water));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// delete =====
export async function DeleteMealWater() {
    await AsyncStorage.setItem(MEAL_WATER_STORE, JSON.stringify(MEAL_WATER_SCHEMA));
}



// set meal water =====
export async function SetMealWater( mililiters ) {
    try {
        await AsyncStorage.setItem(MEAL_WATER_STORE, JSON.stringify({
            mililiters: mililiters
        }));
    } catch (error) {
        console.log(error);
    }

    setUserPreferenceParameter(0, {
        mililiters: mililiters
    });
}
// set water mililiters
export async function SetMealWaterMililiters(mililiters) {
    try {
        await AsyncStorage.getItem(MEAL_WATER_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const water = JSON.parse(result);
            water.mililiters = mililiters
            await AsyncStorage.setItem(MEAL_WATER_STORE, JSON.stringify(water));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// get meal water =====
export async function GetMealWater(setMealWater) {
    try {
        await AsyncStorage.getItem(MEAL_WATER_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            return setMealWater(JSON.parse(result));
        });
    } catch (error) {
        console.log(error);
    }
}
// get water mililiters
export async function GetMealWaterMililiters(setMealWaterMililiters) {
    try {
        await AsyncStorage.getItem(MEAL_WATER_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const water = JSON.parse(result);
            return setMealWaterMililiters(water.mililiters);
        });
    } catch (error) {
        console.log(error);
    }
}
