import { LOG_STEPS_STORE } from "../../database_stores";
import { 
    Insert,
    Delete,
    SelectAll
} from "../../general/database";



// insert
export async function InsertSteps( steps ) {
    const today = new Date();
    const recordedDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    Insert(LOG_STEPS_STORE, {
        key: null,
        steps: steps,
        date: recordedDate
    });
}

// delete
export async function DeleteSteps(key) {
    Delete(LOG_STEPS_STORE, key);
}

// select
export async function SelectAllSteps(setSteps) {
    return SelectAll(LOG_STEPS_STORE, setSteps);
}