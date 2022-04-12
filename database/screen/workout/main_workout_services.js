import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    WORKOUT_PLAN_NAME,
    WORKOUT_MONDAY,
    WORKOUT_TUESDAY,
    WORKOUT_WEDNESDAY,
    WORKOUT_THURSDAY,
    WORKOUT_FRIDAY,
    WORKOUT_SATURDAY,
    WORKOUT_SUNDAY
} from '../../database_stores';



// get data for workout screen
export async function GetWorkoutScreenData() {
    try {
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
            days: [monday, tuesday, wednesday, thursday, friday, saturday, sunday]
        }        
    } catch (error) {
        console.log('GetWorkoutScreenData error');
        console.log(error);
    }
}
