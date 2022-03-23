import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_IS_WORKOUT_SETUP,
    SYSTEM_IS_MEAL_SETUP,
    SYSTEM_IS_USER_SETUP,
    SYSTEM_LAST_DAY_OPENED
} from '../database_stores';
import { IsResultEmpty } from '../../helpers/databaseValidations';
import { isLastDayOpenedCurrentDay } from '../../helpers/dateHelper';



// get data for root navigation
export async function GetAppData() {
    try {
        const isUserSetupResult = await AsyncStorage.getItem(SYSTEM_IS_USER_SETUP);
        // console.log('isUserSetupResult', isUserSetupResult);
        if(IsResultEmpty(isUserSetupResult)) return console.log('system is user setup has no data'); 

        const isMealSetupResult = await AsyncStorage.getItem(SYSTEM_IS_MEAL_SETUP);
        // console.log('isMealSetupResult', isMealSetupResult);
        if(IsResultEmpty(isMealSetupResult)) return console.log('system is meal setup has no data'); 

        const isWorkoutSetupResult = await AsyncStorage.getItem(SYSTEM_IS_WORKOUT_SETUP);
        // console.log('isWorkoutSetupResult', isWorkoutSetupResult);
        if(IsResultEmpty(isWorkoutSetupResult)) return console.log('system is workout setup has no data'); 
        

        // store has data
        const isUserSetup = JSON.parse(isUserSetupResult);
        const isMealSetup = JSON.parse(isMealSetupResult);
        const isWorkoutSetup = JSON.parse(isWorkoutSetupResult);

        // console.log('isUserSetup', isUserSetup);
        // console.log('isMealSetup', isMealSetup);
        // console.log('isWorkoutSetup', isWorkoutSetup);

        return {
            isUserSetup: isUserSetup,
            isMealSetup: isMealSetup,
            isWorkoutSetup: isWorkoutSetup
        }        
    } catch (error) {
        console.log(error);
    }
}



// save data if day changed
export async function SaveDataIfDayChanged() {
    try {
        const lastDayOpenedString = await AsyncStorage.getItem(SYSTEM_LAST_DAY_OPENED);
        console.log('lastDayOpenedString', lastDayOpenedString);
        
        const today = new Date();
        const savedString = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
        
        if(lastDayOpenedString == 'null' || lastDayOpenedString == null) {
            console.log('lastDayOpenedString has no data');
            return;
        }

        if(isLastDayOpenedCurrentDay(lastDayOpenedString)) {
            console.log('lastDayOpenedString is current day');
            return;
        }

        console.log('lastDayOpenedString is old');
        console.log('doing work');
        await AsyncStorage.setItem(SYSTEM_LAST_DAY_OPENED, savedString);
        return;
    } catch (error) {
        console.log(error);
    }
}
