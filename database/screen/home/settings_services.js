import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    USER_INFO,
    USER_GOALS,
    WORKOUT_PLAN_NAME,
    WORKOUT_MONDAY,
    WORKOUT_TUESDAY,
    WORKOUT_WEDNESDAY,
    WORKOUT_THURSDAY,
    WORKOUT_FRIDAY,
    WORKOUT_SATURDAY,
    WORKOUT_SUNDAY
} from '../../database_stores';



// get data for home screen
export async function GetEditUserDataScreenData() {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user', user);
        return {
            name: user.name,
            age: `${user.age}`,
            height: `${user.height}`
        };
    } catch (error) {
        console.log('GetEditUserDataScreenData error');
        console.log(error);
    }
}

export async function SetEditUserData(name, age, height) {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user before', user);
        if(user.name == name && user.age == parseInt(age) && user.height == parseInt(height)) return;
        
        user.name = name;
        user.age = parseInt(age);
        user.height = parseInt(height);        
        // console.log('user after', user);
        await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));
    } catch (error) {
        console.log('SetEditUserData error');
        console.log(error);
    }
}



// get data for edit meal screen
export async function GetEditMealDataScreenData() {
    try {
        const userGoalsResult = await AsyncStorage.getItem(USER_GOALS);
        const userGoals = JSON.parse(userGoalsResult);
        // console.log('userGoals', userGoals);
        return {
            caloriesGoal: userGoals.caloriesGoal,
            carbsGoal: userGoals.carbsGoal,
            proteinGoal: userGoals.proteinGoal,
            fatGoal: userGoals.fatGoal
        };
    } catch (error) {
        console.log('GetEditMealDataScreenData error');
        console.log(error);
    }
}

export async function SetEditMealData(caloriesGoal, carbsGoal, proteinGoal, fatGoal) {
    try {
        const userGoalsResult = await AsyncStorage.getItem(USER_GOALS);
        const userGoals = JSON.parse(userGoalsResult);
        // console.log('userGoals', userGoals);
        if( userGoals.caloriesGoal == caloriesGoal && userGoals.carbsGoal == carbsGoal && userGoals.proteinGoal == proteinGoal && userGoals.fatGoal == fatGoal ) return;
        
        if(userGoals.caloriesGoal != caloriesGoal) userGoals.caloriesGoal = caloriesGoal;
        if(userGoals.carbsGoal != carbsGoal) userGoals.carbsGoal = carbsGoal;
        if(userGoals.proteinGoal != proteinGoal) userGoals.proteinGoal = proteinGoal;
        if(userGoals.fatGoal != fatGoal) userGoals.fatGoal = fatGoal;
        await AsyncStorage.setItem(USER_GOALS, JSON.stringify(userGoals));
        // console.log('userGoals after', userGoals);
    } catch (error) {
        console.log('SetEditMealData error');
        console.log(error);
    }
}



// get data for edit workout screen
export async function GetEditWorkoutDataScreenData() {
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
            monday: monday, 
            tuesday: tuesday, 
            wednesday: wednesday, 
            thursday: thursday, 
            friday: friday, 
            saturday: saturday, 
            sunday: sunday
        };
    } catch (error) {
        console.log('GetEditWorkoutDataScreenData error');
        console.log(error);
    }
}
