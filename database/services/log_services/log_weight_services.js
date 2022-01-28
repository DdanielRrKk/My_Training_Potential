import { LOG_WEIGHT_STORE } from "../../database_stores";
import { 
    Insert,
    Delete,
    SelectAll
} from "../../general/database";



// insert
export async function InsertWeight( weight ) {
    const today = new Date();
    const recordedDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    Insert(LOG_WEIGHT_STORE, {
        key: null,
        weight: weight,
        date: recordedDate
    });
}

// delete
export async function DeleteWeight(key) {
    Delete(LOG_WEIGHT_STORE, key);
}

// select
export async function SelectAllWeight(setWeight) {
    return SelectAll(LOG_WEIGHT_STORE, setWeight);
}