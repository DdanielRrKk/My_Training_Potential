import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_STATE,
    WORKOUT_PLAN_NAME,
    WORKOUT_MONDAY,
    WORKOUT_TUESDAY,
    WORKOUT_WEDNESDAY,
    WORKOUT_THURSDAY,
    WORKOUT_FRIDAY,
    WORKOUT_SATURDAY,
    WORKOUT_SUNDAY
} from '../../database_stores';
import { 
    SYSTEM_USER_AND_WORKOUT_SETUP, 
    SYSTEM_ALL_SETUP 
} from '../../../helpers/constants';



// get data for workout screen
export async function GetWorkoutScreenData() {
    try {
        const systemStateResult = await AsyncStorage.getItem(SYSTEM_STATE);
        const systemState = parseInt(systemStateResult);
        if(systemState != SYSTEM_USER_AND_WORKOUT_SETUP && systemState != SYSTEM_ALL_SETUP) {
            console.log('GetWorkoutScreenData is not setup');
            return {
                name: null,
                days: null,
                isWorkoutSetup: false
            };
        }

        const planNameResult = await AsyncStorage.getItem(WORKOUT_PLAN_NAME);
        const mondayResult = await AsyncStorage.getItem(WORKOUT_MONDAY);
        const tuesdayResult = await AsyncStorage.getItem(WORKOUT_TUESDAY);
        const wednesdayResult = await AsyncStorage.getItem(WORKOUT_WEDNESDAY);
        const thursdayResult = await AsyncStorage.getItem(WORKOUT_THURSDAY);
        const fridayResult = await AsyncStorage.getItem(WORKOUT_FRIDAY);
        const saturdayResult = await AsyncStorage.getItem(WORKOUT_SATURDAY);
        const sundayResult = await AsyncStorage.getItem(WORKOUT_SUNDAY);

        // store has data
        const monday = JSON.parse(mondayResult);
        const tuesday = JSON.parse(tuesdayResult);
        const wednesday = JSON.parse(wednesdayResult);
        const thursday = JSON.parse(thursdayResult);
        const friday = JSON.parse(fridayResult);
        const saturday = JSON.parse(saturdayResult);
        const sunday = JSON.parse(sundayResult);

        // console.log('monday', monday);
        // console.log('tuesday', tuesday);
        // console.log('wednesday', wednesday);
        // console.log('thursday', thursday);
        // console.log('friday', friday);
        // console.log('saturday', saturday);
        // console.log('sunday', sunday);

        return {
            name: planNameResult,
            days: [monday, tuesday, wednesday, thursday, friday, saturday, sunday],
            isWorkoutSetup: true
        };     
    } catch (error) {
        console.log('GetWorkoutScreenData error');
        console.log(error);
    }
}
