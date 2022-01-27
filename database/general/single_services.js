import AsyncStorage from '@react-native-async-storage/async-storage';



// insert
export async function InsertSingle(store, object) {
    try {
        await AsyncStorage.setItem(store, JSON.stringify(object));
    } catch (error) {
        console.log(error);
    }
}

// update
export async function UpdateSingle(store, rawObject) {
    try {
        const object = Object.fromEntries(Object.entries(rawObject).filter(([_, value]) => value != null));

        await AsyncStorage.getItem(store, async (err, result) => {
            if (result == null || result == '') return; // object does not exist
            // object exists
            const oldObject = JSON.parse(result);
            const newObject = {...oldObject, ...object};
            await AsyncStorage.setItem(store, JSON.stringify(newObject));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

// delete
export async function DeleteSingle(store) {
    try {
        await AsyncStorage.setItem(store, '');
    } catch (error) {
        console.log(error);
    }
}

// select
export async function SelectSingle(store, setUser) {
    try {
        await AsyncStorage.getItem(store, async (err, result) => {
            if (result == null || result == '') return; // object does not exist
            // object exists
            setUser(JSON.parse(result));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}