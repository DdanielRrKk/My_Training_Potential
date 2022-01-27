import { USER_STORE } from "../../database_stores";
import { 
    InsertSingle,
    UpdateSingle,
    DeleteSingle,
    SelectSingle
} from "../../general/single_services";



// insert
export async function InsertUserData(
    name, 
    age,
    height,
    weight,
    gender
    ) 
    {
    InsertSingle(USER_STORE, {
        name: name,
        age: age,
        height: height,
        weight: weight,
        gender: gender
    });
}

// update
export async function UpdateUserData(
    name = null, 
    age = null, 
    height = null,
    weight = null,
    gender = null
    ) 
    {
    UpdateSingle(USER_STORE, {
        name: name,
        age: age,
        height: height,
        weight: weight,
        gender: gender
    });
}

// delete
export async function DeleteUserData() {
    DeleteSingle(USER_STORE);
}

// select
export async function SelectUserData(setUserData) {
    return SelectSingle(USER_STORE, setUserData);
}