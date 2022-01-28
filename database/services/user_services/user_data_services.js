import AsyncStorage from '@react-native-async-storage/async-storage';

import { USER_DATA_STORE } from "../../database_stores";



function setUserDataParameter(param_number, parameter) {
    try {
        if(param_number == 6) { // add new user
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

function getUserDataParameter(param_number, setParameter) {
    try {
        await AsyncStorage.getItem(USER_DATA_STORE, async (err, result) => {
            if (result == null || result == '') return; // object has no data
            // object has data
            const user = JSON.parse(result);
            switch(param_number) {
                case 1: setParameter(user.name); break; // get user name
                case 2: setParameter(user.age); break; // get user age
                case 3: setParameter(user.height); break; // get user height
                case 4: setParameter(user.weight); break; // get user weight
                case 5: setParameter(user.gender); break; // get user gender
                case 6: setParameter(user); break; // get user 
                default: break;
            }
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// delete =====
export async function DeleteUserData() {
    await AsyncStorage.setItem(USER_DATA_STORE, '');
}



// set user =====
export async function SetUserData( name, age, height, weight, gender ) {
    setUserDataParameter(6, {
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
export async function SetUserDataName(age) {
    return setUserDataParameter(2, age);
}
// set user height
export async function SetUserDataName(height) {
    return setUserDataParameter(3, height);
}
// set user weight
export async function SetUserDataName(weight) {
    return setUserDataParameter(4, weight);
}
// set user gender
export async function SetUserDataName(gender) {
    return setUserDataParameter(5, gender);
}



// get user =====
export async function GetUserData(setUserData) {
    return getUserDataParameter(6, setUserData);
}

// get user name
export async function GetUserDataName(setUserName) {
    return getUserDataParameter(1, setUserName);
}
// get user age
export async function GetUserDataName(setUserAge) {
    return getUserDataParameter(2, setUserAge);
}
// get user height
export async function GetUserDataName(setUserHeight) {
    return getUserDataParameter(3, setUserHeight);
}
// get user weight
export async function GetUserDataName(setUserWeight) {
    return getUserDataParameter(4, setUserWeight);
}
// get user gender
export async function GetUserDataName(setUserGender) {
    return getUserDataParameter(5, setUserGender);
}