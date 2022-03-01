import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOG_MEALS_STORE } from "../../database_stores";
import { LOG_SCHEMA } from '../../database_shemas';
import { 
    getCurrentDateForLogs,
    isCurrentDateForLogs 
} from '../../../helpers/dateHelper';



// delete =====
export async function DeleteMealLog() {
    await AsyncStorage.setItem(LOG_MEALS_STORE, JSON.stringify(LOG_SCHEMA));
}



// set log =====
export async function SetMealLog( 
    water,
    calories,
    carbs,
    protein,
    fat,
    breakfast_cal,
    lunch_cal,
    dinner_cal
 ) {
    try {
        await AsyncStorage.getItem(LOG_MEALS_STORE, async (err, result) => {
            if (result == null || result == '[]') {
                // object has no data
                const date = getCurrentDateForLogs();
                const log = [{
                    key: 1,
                    water: water,
                    calories: calories,
                    carbs: carbs,
                    protein: protein,
                    fat: fat,
                    breakfast_cal: breakfast_cal,
                    lunch_cal: lunch_cal,
                    dinner_cal: dinner_cal,
                    date: date
                }];

                await AsyncStorage.setItem(LOG_MEALS_STORE, JSON.stringify(log));
                return;
            }
            // object has data
            const log = JSON.parse(result);
            const lastLog = log[log.length - 1];

            if(isCurrentDateForLogs(lastLog.date)) {
                log[log.length - 1].water = water;
                log[log.length - 1].calories = calories;
                log[log.length - 1].carbs = carbs;
                log[log.length - 1].protein = protein;
                log[log.length - 1].fat = fat;
                log[log.length - 1].breakfast_cal = breakfast_cal;
                log[log.length - 1].lunch_cal = lunch_cal;
                log[log.length - 1].dinner_cal = dinner_cal;
                
                await AsyncStorage.setItem(LOG_MEALS_STORE, JSON.stringify(log));
                return;
            }

            const date = getCurrentDateForLogs();
            log.push({
                key: lastLog + 1,
                water: water,
                calories: calories,
                carbs: carbs,
                protein: protein,
                fat: fat,
                breakfast_cal: breakfast_cal,
                lunch_cal: lunch_cal,
                dinner_cal: dinner_cal,
                date: date
            });
            
            await AsyncStorage.setItem(LOG_MEALS_STORE, JSON.stringify(log));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

// get meal log =====
export async function GetMealLog(setMealLog) {
    try {
        await AsyncStorage.getItem(LOG_MEALS_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            return setMealLog(JSON.parse(result));
        });
    } catch (error) {
        console.log(error);
    }
}