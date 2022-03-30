import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
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
export async function GetOpenWorkoutScreenData(day_number) {
    try {
        switch(day_number) {
            case 1: {
                const mondayResult = await AsyncStorage.getItem(WORKOUT_MONDAY);
                // console.log('mondayResult', mondayResult);
                if(IsResultEmpty(mondayResult)) return console.log('monday has no data'); 

                const monday = JSON.parse(mondayResult);
                // console.log('monday', monday);

                const today = new Date();
                return {
                    name: monday.name,
                    exercises: monday.exercises,
                    isToday: (today.getDay() == 1) ? true : false
                } 
            }

            case 2: {
                const tuesdayResult = await AsyncStorage.getItem(WORKOUT_TUESDAY);
                // console.log('tuesdayResult', tuesdayResult);
                if(IsResultEmpty(tuesdayResult)) return console.log('tuesday has no data'); 
        
                const tuesday = JSON.parse(tuesdayResult);
                // console.log('tuesday', tuesday);

                const today = new Date();
                return {
                    name: tuesday.name,
                    exercises: tuesday.exercises,
                    isToday: (today.getDay() == 2) ? true : false
                } 
            }

            case 3: {
                const wednesdayResult = await AsyncStorage.getItem(WORKOUT_WEDNESDAY);
                // console.log('wednesdayResult', wednesdayResult);
                if(IsResultEmpty(wednesdayResult)) return console.log('wednesday has no data'); 
        
                const wednesday = JSON.parse(wednesdayResult);
                // console.log('wednesday', wednesday);

                const today = new Date();
                return {
                    name: wednesday.name,
                    exercises: wednesday.exercises,
                    isToday: (today.getDay() == 3) ? true : false
                } 
            }

            case 4: {
                const thursdayResult = await AsyncStorage.getItem(WORKOUT_THURSDAY);
                // console.log('thursdayResult', thursdayResult);
                if(IsResultEmpty(thursdayResult)) return console.log('thursday has no data'); 
        
                const thursday = JSON.parse(thursdayResult);
                // console.log('thursday', thursday);

                const today = new Date();
                return {
                    name: thursday.name,
                    exercises: thursday.exercises,
                    isToday: (today.getDay() == 4) ? true : false
                } 
            }

            case 5: {
                const fridayResult = await AsyncStorage.getItem(WORKOUT_FRIDAY);
                // console.log('fridayResult', fridayResult);
                if(IsResultEmpty(fridayResult)) return console.log('friday has no data');
        
                const friday = JSON.parse(fridayResult);
                // console.log('friday', friday);

                const today = new Date();
                return {
                    name: friday.name,
                    exercises: friday.exercises,
                    isToday: (today.getDay() == 5) ? true : false
                } 
            }

            case 6: {
                const saturdayResult = await AsyncStorage.getItem(WORKOUT_SATURDAY);
                // console.log('saturdayResult', saturdayResult);
                if(IsResultEmpty(saturdayResult)) return console.log('saturday has no data');
        
                const saturday = JSON.parse(saturdayResult);
                // console.log('saturday', saturday);

                const today = new Date();
                return {
                    name: saturday.name,
                    exercises: saturday.exercises,
                    isToday: (today.getDay() == 6) ? true : false
                } 
            }

            case 7: {
                const sundayResult = await AsyncStorage.getItem(WORKOUT_SUNDAY);
                // console.log('sundayResult', sundayResult);
                if(IsResultEmpty(sundayResult)) return console.log('sunday has no data');
        
                const sunday = JSON.parse(sundayResult);
                // console.log('sunday', sunday);

                const today = new Date();
                return {
                    name: sunday.name,
                    exercises: sunday.exercises,
                    isToday: (today.getDay() == 0) ? true : false
                } 
            }
            default: return null;
        }     
    } catch (error) {
        console.log(error);
    }
}
