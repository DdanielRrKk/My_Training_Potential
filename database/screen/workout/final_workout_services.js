import AsyncStorage from '@react-native-async-storage/async-storage';
import { WORKOUT_LOG } from '../../database_stores';
import { IsResultEmpty } from '../../../helpers/databaseValidations';
import { getCurrentDateForLog } from '../../../helpers/dateHelper';



// get data for workout screen
export async function SetWorkoutLogData(day_name, total_time, finished_exercises, note) {
    try {
        const workoutLogResult = await AsyncStorage.getItem(WORKOUT_LOG);
        // console.log('workoutLogResult', workoutLogResult);
        if(IsResultEmpty(workoutLogResult)) return console.log('workout log has no data'); 

        const workoutLog = JSON.parse(workoutLogResult);

        console.log('workoutLog before', workoutLog);
        const currentDate = getCurrentDateForLog();
        if(workoutLog.length == 0) {
            workoutLog.push({
                key: 1,
                name: day_name,
                total_time: total_time,
                finished_exercises: finished_exercises,
                note: note,
                date: currentDate
            });
        }
        else {
            const lastKey = workoutLog[workoutLog.length - 1].key + 1;
            workoutLog.push({
                key: lastKey,
                name: day_name,
                total_time: total_time,
                finished_exercises: finished_exercises,
                note: note,
                date: currentDate
            });
        }

        console.log('workoutLog after', workoutLog);

        await AsyncStorage.setItem(WORKOUT_LOG, JSON.stringify(workoutLog));
    } catch (error) {
        console.log(error);
    }
}
