import AsyncStorage from '@react-native-async-storage/async-storage';
import { MEAL_WATER_STORE } from "../../database_stores";
import { MEAL_WATER_SCHEMA } from '../../database_shemas';



// add water
export async function AddWater(mililiters) {
    try {
        const result = await AsyncStorage.getItem(USER_DATA_STORE);
        if(result == null || result == '') {
            console.log('object has no data');
            await AsyncStorage.setItem(MEAL_WATER_STORE, JSON.stringify(mililiters));
            return;
        }

        const water = parseInt(JSON.parse(result));
        const total = water + mililiters;
        await AsyncStorage.setItem(MEAL_WATER_STORE, JSON.stringify(total));
        return;
    } catch (error) {
        console.log(error);
    }
}
// remove water
export async function RemoveWater(mililiters) {
    try {
        const result = await AsyncStorage.getItem(USER_DATA_STORE);
        if(result == null || result == '') return console.log('object has no data');

        const water = parseInt(JSON.parse(result));
        const total = water - mililiters;
        await AsyncStorage.setItem(MEAL_WATER_STORE, JSON.stringify(total));
        return;
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
        await AsyncStorage.setItem(MEAL_WATER_STORE, JSON.stringify(mililiters));
    } catch (error) {
        console.log(error);
    }
}



// get meal water =====
export async function GetMealWater() {
    try {
        const result = await AsyncStorage.getItem(USER_DATA_STORE);
        if(result == null || result == '') return console.log('object has no data');
        return parseInt(JSON.parse(result));
    } catch (error) {
        console.log(error);
    }
}
