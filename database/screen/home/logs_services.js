import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    MEAL_LOG,
    WORKOUT_LOG
} from '../../database_stores';
import { IsResultEmpty } from '../../../helpers/databaseValidations';



// get data for meal log
export async function GetMealLogData() {
    try {
        const mealLogResult = await AsyncStorage.getItem(MEAL_LOG);
        // console.log('mealLogResult', mealLogResult);
        if(IsResultEmpty(mealLogResult)) return console.log('meal log has no data'); 

        // store has data
        const mealLog = JSON.parse(mealLogResult);
        // console.log('mealLog', mealLog);

        return mealLog;     
    } catch (error) {
        console.log(error);
    }
}



// get data for workout log
export async function GetWorkoutLogData() {
    try {
        const workoutLogResult = await AsyncStorage.getItem(WORKOUT_LOG);
        // console.log('workoutLogResult', workoutLogResult);
        if(IsResultEmpty(workoutLogResult)) return console.log('workout log has no data'); 

        // store has data
        const workoutLog = JSON.parse(workoutLogResult);
        // console.log('workoutLog', workoutLog);

        return workoutLog;     
    } catch (error) {
        console.log(error);
    }
}
