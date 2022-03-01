import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_DATA_STORE } from "../../database_stores";
import { USER_DATA_SCHEMA } from '../../database_shemas';



async function setUserDataParameter(param_number, parameter) {
    try {
        const result = await AsyncStorage.getItem(USER_DATA_STORE);
        if(result == null || result == '') return console.log('object has no data');

        if(param_number == 0) {
            await AsyncStorage.setItem(USER_DATA_STORE, JSON.stringify(parameter));
            return;
        }

        const user = JSON.parse(result);
        switch(param_number) {
            case 1: user.name = parameter; break; 
            case 2: user.age = parameter; break; 
            case 3: user.height = parameter; break; 
            case 4: user.weight = parameter; break;
            case 5: user.gender = parameter; break; 
            default: break;
        }
        await AsyncStorage.setItem(USER_DATA_STORE, JSON.stringify(user));
        return;
    } catch (error) {
        console.log(error);
    }
}

async function getUserDataParameter(param_number) {
    try {
        const result = await AsyncStorage.getItem(USER_DATA_STORE);
        if(result == null || result == '') return console.log('object has no data');

        const user = JSON.parse(result);
        if(param_number == 0) return user;
        if(param_number == 1) return user.name;
        if(param_number == 2) return user.age;
        if(param_number == 3) return user.height;
        if(param_number == 4) return user.weight;
        if(param_number == 5) return user.gender;
        return console.log('not found');
    } catch (error) {
        console.log(error);
    }
}



export async function SetUserDataMeasurements(age, weight, height) {
    try {
        const result = await AsyncStorage.getItem(USER_DATA_STORE);
        if(result == null || result == '') return console.log('object has no data');

        const user = JSON.parse(result);
        user.age = age;
        user.weight = weight;
        user.height = height;
        await AsyncStorage.setItem(USER_DATA_STORE, JSON.stringify(user));
        return;
    } catch (error) {
        console.log(error);
    }
}

export async function GetUserDataMeasurements() {
    try {
        const result = await AsyncStorage.getItem(USER_DATA_STORE);
        if(result == null || result == '') return console.log('object has no data');

        const user = JSON.parse(result);
        return {
            age: user.age,
            weight: user.weight,
            height: user.height
        };
        
    } catch (error) {
        console.log(error);
    }
}



// delete =====
export async function DeleteUserData() {
    await AsyncStorage.setItem(USER_DATA_STORE, JSON.stringify(USER_DATA_SCHEMA));
}



// set user =====
export async function SetUserData( name, age, height, weight, gender ) {
    setUserDataParameter(0, {
        name: name,
        age: age,
        height: height,
        weight: weight,
        gender: gender
    });
}
export async function SetUserDataName(name) {
    return setUserDataParameter(1, name);
}
export async function SetUserDataAge(age) {
    return setUserDataParameter(2, age);
}
export async function SetUserDataHeight(height) {
    return setUserDataParameter(3, height);
}
export async function SetUserDataWeight(weight) {
    return setUserDataParameter(4, weight);
}
export async function SetUserDataGender(gender) {
    return setUserDataParameter(5, gender);
}



// get user =====
export async function GetUserData() {
    return getUserDataParameter(0);
}
export async function GetUserDataName() {
    return getUserDataParameter(1);
}
export async function GetUserDataAge() {
    return getUserDataParameter(2);
}
export async function GetUserDataHeight() {
    return getUserDataParameter(3);
}
export async function GetUserDataWeight() {
    return getUserDataParameter(4);
}
export async function GetUserDataGender() {
    return getUserDataParameter(5);
}