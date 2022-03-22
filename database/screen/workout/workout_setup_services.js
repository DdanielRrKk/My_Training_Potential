import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_IS_WORKOUT_SETUP,
    WORKOUT_PLAN_NAME,
    WORKOUT_MONDAY,
    WORKOUT_TUESDAY,
    WORKOUT_WEDNESDAY,
    WORKOUT_THURSDAY,
    WORKOUT_FRIDAY,
    WORKOUT_SATURDAY,
    WORKOUT_SUNDAY,
    USER_ACTIVITY_LEVEL
} from '../../database_stores';



export async function SetWorkoutPlan(
    plan_name,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
) {
    try {
        let activity_level = 0;
        if(monday.name != null) activity_level++;
        if(tuesday.name != null) activity_level++;
        if(wednesday.name != null) activity_level++;
        if(thursday.name != null) activity_level++;
        if(friday.name != null) activity_level++;
        if(saturday.name != null) activity_level++;
        if(sunday.name != null) activity_level++;
        await AsyncStorage.setItem(USER_ACTIVITY_LEVEL, JSON.stringify(activity_level));

        await AsyncStorage.setItem(WORKOUT_PLAN_NAME, plan_name);

        await AsyncStorage.setItem(WORKOUT_MONDAY, JSON.stringify(monday));
        await AsyncStorage.setItem(WORKOUT_TUESDAY, JSON.stringify(tuesday));
        await AsyncStorage.setItem(WORKOUT_WEDNESDAY, JSON.stringify(wednesday));
        await AsyncStorage.setItem(WORKOUT_THURSDAY, JSON.stringify(thursday));
        await AsyncStorage.setItem(WORKOUT_FRIDAY, JSON.stringify(friday));
        await AsyncStorage.setItem(WORKOUT_SATURDAY, JSON.stringify(saturday));
        await AsyncStorage.setItem(WORKOUT_SUNDAY, JSON.stringify(sunday));

        await AsyncStorage.setItem(SYSTEM_IS_WORKOUT_SETUP, JSON.stringify(true));
        return;
    } catch (error) {
        console.log(error);
    }
}