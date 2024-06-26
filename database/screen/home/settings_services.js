import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    USER_INFO,
    USER_GOALS,
    WORKOUT_PLAN,
    SYSTEM_NOTIFICATIONS
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
        const workoutPlanResult = await AsyncStorage.getItem(WORKOUT_PLAN);
        const workoutPlan = JSON.parse(workoutPlanResult);
        // console.log('workoutPlan', workoutPlan);
        return workoutPlan;
    } catch (error) {
        console.log('GetEditWorkoutDataScreenData error');
        console.log(error);
    }
}



// get data for notifications screen
export async function GetNotificationsScreenData() {
    try {
        const notificationsResult = await AsyncStorage.getItem(SYSTEM_NOTIFICATIONS);
        const notifications = JSON.parse(notificationsResult);
        // console.log('notifications', notifications);
        return notifications;
    } catch (error) {
        console.log('GetNotificationsScreenData error');
        console.log(error);
    }
}
export async function SetNotificationsScreenData(notifications) {
    try {
        await AsyncStorage.setItem(SYSTEM_NOTIFICATIONS, JSON.stringify(notifications));
    } catch (error) {
        console.log('SetNotificationsScreenData error');
        console.log(error);
    }
}
