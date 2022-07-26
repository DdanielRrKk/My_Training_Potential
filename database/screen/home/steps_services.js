import AsyncStorage from '@react-native-async-storage/async-storage';
import { STEPS_LOG } from '../../database_stores';

import { getCurrentDateForLog } from '../../../helpers/dateHelper';



// get data for steps screen
export async function GetStepsScreenData() {
    try {
        const stepsLogResult = await AsyncStorage.getItem(STEPS_LOG);
        const stepsLog = JSON.parse(stepsLogResult);
        // console.log('stepsLog', stepsLog);

        return stepsLog;
    } catch (error) {
        console.log('GetStepsScreenData error');
        console.log(error);
    }
}

// set steps log data
export async function SetStepsLogData(steps) {
    try {
        const stepsLogResult = await AsyncStorage.getItem(STEPS_LOG);
        const stepsLog = JSON.parse(stepsLogResult);
        // console.log('stepsLog', stepsLog);

        const currentDate = getCurrentDateForLog();
        const lastKey = stepsLog[0].key + 1;
        stepsLog.unshift({
            key: lastKey,
            steps: steps,
            date: currentDate
        });
        // console.log('stepsLog after', stepsLog);
        await AsyncStorage.setItem(STEPS_LOG, JSON.stringify(stepsLog));
    } catch (error) {
        console.log('SetStepsLogData error');
        console.log(error);
    }
}
