import { USER_PREFERENCES_STORE } from "../../database_stores";
import { 
    InsertSingle,
    UpdateSingle,
    DeleteSingle,
    SelectSingle
} from "../../general/single_services";



// insert
export async function InsertUserPreferences(
    isMetric
    ) 
    {
    InsertSingle(USER_PREFERENCES_STORE, {
        isMetric: isMetric
    });
}

// update
export async function UpdateUserPreferences(
    isMetric = null
    ) 
    {
    UpdateSingle(USER_PREFERENCES_STORE, {
        isMetric: isMetric
    });
}

// delete
export async function DeleteUserPreferences() {
    DeleteSingle(USER_PREFERENCES_STORE);
}

// select
export async function SelectUserPreferences(setUserPreferences) {
    return SelectSingle(USER_PREFERENCES_STORE, setUserPreferences);
}