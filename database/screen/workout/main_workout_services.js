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
import { IsResultEmpty } from '../../../helpers/validations';



// get data for workout screen
export async function GetWorkoutScreenData() {
    try {
        const planNameResult = await AsyncStorage.getItem(WORKOUT_PLAN_NAME);
        // console.log('planNameResult', planNameResult);
        if(IsResultEmpty(planNameResult)) return console.log('workout plan name has no data'); 
        
        const mondayResult = await AsyncStorage.getItem(WORKOUT_MONDAY);
        // console.log('mondayResult', mondayResult);
        if(IsResultEmpty(mondayResult)) return console.log('monday has no data'); 

        const tuesdayResult = await AsyncStorage.getItem(WORKOUT_TUESDAY);
        // console.log('tuesdayResult', tuesdayResult);
        if(IsResultEmpty(tuesdayResult)) return console.log('tuesday has no data'); 

        const wednesdayResult = await AsyncStorage.getItem(WORKOUT_WEDNESDAY);
        // console.log('wednesdayResult', wednesdayResult);
        if(IsResultEmpty(wednesdayResult)) return console.log('wednesday has no data'); 

        const thursdayResult = await AsyncStorage.getItem(WORKOUT_THURSDAY);
        // console.log('thursdayResult', thursdayResult);
        if(IsResultEmpty(thursdayResult)) return console.log('thursday has no data'); 

        const fridayResult = await AsyncStorage.getItem(WORKOUT_FRIDAY);
        // console.log('fridayResult', fridayResult);
        if(IsResultEmpty(fridayResult)) return console.log('friday has no data');

        const saturdayResult = await AsyncStorage.getItem(WORKOUT_SATURDAY);
        // console.log('saturdayResult', saturdayResult);
        if(IsResultEmpty(saturdayResult)) return console.log('saturday has no data');

        const sundayResult = await AsyncStorage.getItem(WORKOUT_SUNDAY);
        // console.log('sundayResult', sundayResult);
        if(IsResultEmpty(sundayResult)) return console.log('sunday has no data');


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
        console.log(error);
    }
}
