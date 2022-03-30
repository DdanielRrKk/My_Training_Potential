import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_WEIGHT, WEIGHT_LOG } from '../../database_stores';

import { IsResultEmpty } from '../../../helpers/validations';
import { getCurrentDateForLog } from '../../../helpers/dateHelper';



// get data for weight screen
export async function GetWeightScreenData() {
    try {
        const weightLogResult = await AsyncStorage.getItem(WEIGHT_LOG);
        // console.log('weightLogResult', weightLogResult);
        if(IsResultEmpty(weightLogResult)) return console.log('weight log has no data'); 

        const weightResult = await AsyncStorage.getItem(USER_WEIGHT);
        // console.log('weightResult', weightResult);
        if(IsResultEmpty(weightResult)) return console.log('user weight has no data'); 

        // store has data
        const weightLog = JSON.parse(weightLogResult);
        const weight = JSON.parse(weightResult);
        // console.log('weightLog', weightLog);
        // console.log('weight', weight);

        return{
            weightLog: weightLog,
            weight: weight
        };      
    } catch (error) {
        console.log(error);
    }
}

// set weight log data
export async function SetWeightLogData(weight) {
    try {
        await AsyncStorage.setItem(USER_WEIGHT, JSON.stringify(weight));

        const weightLogResult = await AsyncStorage.getItem(WEIGHT_LOG);
        // console.log('weightLogResult', weightLogResult);
        if(IsResultEmpty(weightLogResult)) return console.log('weight log has no data'); 

        // store has data
        const weightLog = JSON.parse(weightLogResult);
        // console.log('weightLog before', weightLog);

        const currentDate = getCurrentDateForLog();
        const lastKey = weightLog[weightLog.length - 1].key + 1;
        weightLog.push({
            key: lastKey,
            weight: weight,
            date: currentDate
        });
        // console.log('weightLog after', weightLog);

        await AsyncStorage.setItem(WEIGHT_LOG, JSON.stringify(weightLog));
        return;    
    } catch (error) {
        console.log(error);
    }
}
