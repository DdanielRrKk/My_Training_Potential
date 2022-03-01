import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOG_WEIGHT_STORE } from "../../database_stores";
import { LOG_SCHEMA } from '../../database_shemas';
import { 
    getCurrentDateForLogs,
    isCurrentDateForLogs 
} from '../../../helpers/dateHelper';



function getWeightLogParameter(setParameter) {
    try {
        await AsyncStorage.getItem(LOG_WEIGHT_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const log = JSON.parse(result);
            switch(param_number) {
                case 0: setParameter(log); break; // get weight log
                case 1: setParameter(log.weight); break; // get weight log weight
                case 2: setParameter(log.date); break; // get weight log weight
                default: break;
            }
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// delete =====
export async function DeleteWeightLog() {
    await AsyncStorage.setItem(LOG_WEIGHT_STORE, JSON.stringify(LOG_SCHEMA));
}



// set log =====
export async function SetWeightLogWeight( weight ) {
    try {
        await AsyncStorage.getItem(LOG_WEIGHT_STORE, async (err, result) => {
            if (result == null || result == '[]') {
                // object has no data
                const date = getCurrentDateForLogs();
                const log = [{
                    key: 1,
                    weight: weight,
                    date: date
                }];

                await AsyncStorage.setItem(LOG_WEIGHT_STORE, JSON.stringify(log));
                return;
            }
            // object has data
            const log = JSON.parse(result);
            const lastLog = log[log.length - 1];

            if(isCurrentDateForLogs(lastLog.date)) {
                log[log.length - 1].weight = weight;
                
                await AsyncStorage.setItem(LOG_WEIGHT_STORE, JSON.stringify(log));
                return;
            }

            const date = getCurrentDateForLogs();
            log.push({
                key: lastLog + 1,
                weight: weight,
                date: date
            });
            
            await AsyncStorage.setItem(LOG_WEIGHT_STORE, JSON.stringify(log));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

// get weight log =====
export async function GetWeightLog(setWeightLog) {
    try {
        await AsyncStorage.getItem(LOG_WEIGHT_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            return setWeightLog(JSON.parse(result));
        });
    } catch (error) {
        console.log(error);
    }
}