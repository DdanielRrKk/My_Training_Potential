import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_INFO, WEIGHT_LOG } from '../../database_stores';

import { getCurrentDateForLog } from '../../../helpers/dateHelper';



// get data for weight screen
export async function GetWeightScreenData() {
    try {
        const weightLogResult = await AsyncStorage.getItem(WEIGHT_LOG);
        const weightLog = JSON.parse(weightLogResult);
        // console.log('weightLog', weightLog);

        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user back', user);

        return{
            weightLog: weightLog,
            weight: `${user.weight}`
        }; 
    } catch (error) {
        console.log('GetWeightScreenData error');
        console.log(error);
    }
}

// set weight log data
export async function SetWeightLogData(weight) {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        user.weight = parseInt(weight);
        // console.log('user back', user);
        await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));

        const weightLogResult = await AsyncStorage.getItem(WEIGHT_LOG);
        const weightLog = JSON.parse(weightLogResult);
        // console.log('weightLog', weightLog);
        const currentDate = getCurrentDateForLog();
        const lastKey = weightLog[weightLog.length - 1].key + 1;
        weightLog.unshift({
            key: lastKey,
            weight: weight,
            date: currentDate
        });
        // console.log('weightLog after', weightLog);
        await AsyncStorage.setItem(WEIGHT_LOG, JSON.stringify(weightLog));
    } catch (error) {
        console.log('SetWeightLogData error');
        console.log(error);
    }
}
