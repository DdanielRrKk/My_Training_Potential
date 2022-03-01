import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOG_STEPS_STORE } from "../../database_stores";
import { LOG_SCHEMA } from '../../database_shemas';
import { 
    getCurrentDateForLogs,
    isCurrentDateForLogs 
} from '../../../helpers/dateHelper';



// delete =====
export async function DeleteStepsLog() {
    await AsyncStorage.setItem(LOG_STEPS_STORE, JSON.stringify(LOG_SCHEMA));
}



// set log =====
export async function SetStepsLogSteps( steps ) {
    try {
        await AsyncStorage.getItem(LOG_STEPS_STORE, async (err, result) => {
            if (result == null || result == '[]') {
                // object has no data
                const date = getCurrentDateForLogs();
                const log = [{
                    key: 1,
                    steps: steps,
                    date: date
                }];

                await AsyncStorage.setItem(LOG_STEPS_STORE, JSON.stringify(log));
                return;
            }
            // object has data
            const log = JSON.parse(result);
            const lastLog = log[log.length - 1];

            if(isCurrentDateForLogs(lastLog.date)) {
                log[log.length - 1].steps = steps;
                
                await AsyncStorage.setItem(LOG_STEPS_STORE, JSON.stringify(log));
                return;
            }

            const date = getCurrentDateForLogs();
            log.push({
                key: lastLog + 1,
                steps: steps,
                date: date
            });
            
            await AsyncStorage.setItem(LOG_STEPS_STORE, JSON.stringify(log));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

// get steps log =====
export async function GetStepsLog(setStepsLog) {
    try {
        await AsyncStorage.getItem(LOG_STEPS_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            return setStepsLog(JSON.parse(result));
        });
    } catch (error) {
        console.log(error);
    }
}