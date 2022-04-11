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
        // console.log('user', user);
        user.name = name;
        await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));
    } catch (error) {
        console.log('SetUserName error');
        console.log(error);
    }
}
export async function GetUserName() {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user', user);
        return user.name;
    } catch (error) {
        console.log('GetUserName error');
        console.log(error);
    }
}



export async function SetUserGender(gender) {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user', user);
        user.gender = gender;
        await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));
    } catch (error) {
        console.log('SetUserGender error');
        console.log(error);
    }
}
export async function GetUserGender() {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user', user);
        return user.gender;
    } catch (error) {
        console.log('GetUserGender error');
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
        await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));


        const currentDate = getCurrentDateForLog();
        const weightLog = [{
            key: 1,
            weight: weight,
            date: currentDate
        }];
        // console.log('weightLog', weightLog);
        await AsyncStorage.setItem(WEIGHT_LOG, JSON.stringify(weightLog));


        const systemFlagsResult = await AsyncStorage.getItem(SYSTEM_FLAGS);
        const systemFlags = JSON.parse(systemFlagsResult);
        systemFlags.isUserReady = true;
        // console.log('systemFlags finished', systemFlags);
        await AsyncStorage.setItem(SYSTEM_FLAGS, JSON.stringify(systemFlags));
    } catch (error) {
        console.log('SetUserMeasurements error');
        console.log(error);
    }
}
export async function GetUserMeasurements() {
    try {
        const userResult = await AsyncStorage.getItem(USER_INFO);
        const user = JSON.parse(userResult);
        // console.log('user', user);
        return {
            age: user.age,
            weight: user.weight,
            height: user.height
        };
    } catch (error) {
        console.log('GetUserMeasurements error');
        console.log(error);
    }
}
