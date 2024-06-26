import AsyncStorage from '@react-native-async-storage/async-storage';
import { WORKOUT_LOG } from '../../database_stores';

import { getCurrentDateForLog } from '../../../helpers/dateHelper';



// get data for workout screen
export async function SetWorkoutLogData(day_name, total_time, finished_exercises, note) {
    try {
        const workoutLogResult = await AsyncStorage.getItem(WORKOUT_LOG);
        const workoutLog = JSON.parse(workoutLogResult);
        // console.log('workoutLog before', workoutLog);
        
        const currentDate = getCurrentDateForLog();
        const lastKey = (workoutLog.length == 0) ? 1 : workoutLog[0].key + 1;
        workoutLog.unshift({
            key: lastKey,
            name: day_name,
            total_time: total_time,
            finished_exercises: finished_exercises,
            note: note,
            date: currentDate
        });
        // console.log('workoutLog after', workoutLog);
        await AsyncStorage.setItem(WORKOUT_LOG, JSON.stringify(workoutLog));
    } catch (error) {
        console.log('SetWorkoutLogData error');
        console.log(error);
    }
}
