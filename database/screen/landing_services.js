import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    SYSTEM_FLAGS,
    WEIGHT_LOG,
    USER_INFO
} from '../database_stores';
import { getCurrentDateForLog } from '../../helpers/dateHelper';



export async function SetUserName(name) {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user before', user);

        user.name = name;
        // console.log('user after', user);

        await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));
    } catch (error) {
        console.log(error);
    }
}
export async function GetUserName() {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user back', user);
        return user.name;
    } catch (error) {
        console.log(error);
    }
}



export async function SetUserGender(gender) {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user before', user);

        user.gender = gender;
        // console.log('user after', user);

        await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));
    } catch (error) {
        console.log(error);
    }
}
export async function GetUserGender() {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user back', user);
        return user.gender;
    } catch (error) {
        console.log(error);
    }
}



export async function SetUserMeasurements(age, weight, height) {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user before', user);

        user.age = parseInt(age);
        user.weight = parseInt(weight);
        user.height = parseInt(height);
        // console.log('user finished', user);

        const currentDate = getCurrentDateForLog();
        const weightLog = [{
            key: 1,
            weight: weight,
            date: currentDate
        }];
        // console.log('weightLog', weightLog);

        const systemFlagsResult = await AsyncStorage.getItem(SYSTEM_FLAGS);
        const systemFlags = JSON.parse(systemFlagsResult);
        systemFlags.isUserReady = true;
        console.log('systemFlags finished', systemFlags);
        await AsyncStorage.setItem(SYSTEM_FLAGS, JSON.stringify(systemFlags));

        await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));
        await AsyncStorage.setItem(WEIGHT_LOG, JSON.stringify(weightLog));
    } catch (error) {
        console.log(error);
    }
}
export async function GetUserMeasurements() {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user back', user);
        return {
            age: user.age,
            weight: user.weight,
            height: user.height
        };
    } catch (error) {
        console.log(error);
    }
}
