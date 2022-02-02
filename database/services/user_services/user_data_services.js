import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_DATA_STORE } from "../../database_stores";
import { USER_DATA_SCHEMA } from '../../database_shemas';



async function setUserDataParameter(param_number, parameter) {
    try {
        if(param_number == 0) { // add new user
            await AsyncStorage.setItem(USER_DATA_STORE, JSON.stringify(parameter));
            return;
        }

        await AsyncStorage.getItem(USER_DATA_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const user = JSON.parse(result);
            switch(param_number) {
                case 1: user.name = parameter; break; // add / update user name
                case 2: user.age = parameter; break; // add / update user age
                case 3: user.height = parameter; break; // add / update user height
                case 4: user.weight = parameter; break; // add / update user weight
                case 5: user.gender = parameter; break; // add / update user gender
                default: break;
            }
            await AsyncStorage.setItem(USER_DATA_STORE, JSON.stringify(user));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

async function getUserDataParameter(param_number, setParameter) {
    try {
        await AsyncStorage.getItem(USER_DATA_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const user = JSON.parse(result);
            switch(param_number) {
                case 0: setParameter(user); break; // get user 
                case 1: setParameter(user.name); break; // get user name
                case 2: setParameter(user.age); break; // get user age
                case 3: setParameter(user.height); break; // get user height
                case 4: setParameter(user.weight); break; // get user weight
                case 5: setParameter(user.gender); break; // get user gender
                default: break;
            }
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

export async function SetUserDataMeasurements(age, weight, height) {
    try {
        await AsyncStorage.getItem(USER_DATA_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const user = JSON.parse(result);
            user.age = age;
            user.weight = weight;
            user.height = height;
            await AsyncStorage.setItem(USER_DATA_STORE, JSON.stringify(user));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}
export async function GetUserDataMeasurements(setAge, setWeight, setHeight) {
    try {
        await AsyncStorage.getItem(USER_DATA_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const user = JSON.parse(result);
            setAge(user.age);
            setWeight(user.weight);
            setHeight(user.height);
            return;
        });
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
// set user name
export async function SetUserDataName(name) {
    return setUserDataParameter(1, name);
}
// set user age
export async function SetUserDataAge(age) {
    return setUserDataParameter(2, age);
}
// set user height
export async function SetUserDataHeight(height) {
    return setUserDataParameter(3, height);
}
// set user weight
export async function SetUserDataWeight(weight) {
    return setUserDataParameter(4, weight);
}
// set user gender
export async function SetUserDataGender(gender) {
    return setUserDataParameter(5, gender);
}



// get user =====
export async function GetUserData(setUserData) {
    return getUserDataParameter(0, setUserData);
}
// get user name
export async function GetUserDataName(setUserName) {
    return getUserDataParameter(1, setUserName);
}
// get user age
export async function GetUserDataAge(setUserAge) {
    return getUserDataParameter(2, setUserAge);
}
// get user height
export async function GetUserDataHeight(setUserHeight) {
    return getUserDataParameter(3, setUserHeight);
}
// get user weight
export async function GetUserDataWeight(setUserWeight) {
    return getUserDataParameter(4, setUserWeight);
}
// get user gender
export async function GetUserDataGender(setUserGender) {
    return getUserDataParameter(5, setUserGender);
}