import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
    DATABASE_STORE,
    USER_STORE,
    USER_WORKOUTS_STORE,
    USER_MEALS_STORE,
    USER_PREFERENCES_STORE,
    WORKOUT_PLANS_STORE,
    WORKOUT_DAYS_STORE,
    WORKOUT_EXERCISES_STORE,
    MEAL_MAIN_STORE,
    MEAL_SINGLES_STORE,
    LOG_STEPS_STORE,
    LOG_WEIGHT_STORE,
    LOG_MEALS_STORE,
    LOG_WORKOUTS_STORE
} from '../database_stores';



// initialize database
export async function CreateDatabase() {
    try {
        CreateNewProfile();
        await AsyncStorage.setItem(DATABASE_STORE, 'init');

        await AsyncStorage.setItem(USER_STORE, '');
        await AsyncStorage.setItem(USER_WORKOUTS_STORE, '');
        await AsyncStorage.setItem(USER_MEALS_STORE, '');
        await AsyncStorage.setItem(USER_PREFERENCES_STORE, '');

        await AsyncStorage.setItem(WORKOUT_PLANS_STORE, []);
        await AsyncStorage.setItem(WORKOUT_DAYS_STORE, []);
        await AsyncStorage.setItem(WORKOUT_EXERCISES_STORE, []);
        
        await AsyncStorage.setItem(MEAL_MAIN_STORE, []);
        await AsyncStorage.setItem(MEAL_SINGLES_STORE, []);
        
        await AsyncStorage.setItem(LOG_STEPS_STORE, []);
        await AsyncStorage.setItem(LOG_WEIGHT_STORE, []);
        await AsyncStorage.setItem(LOG_MEALS_STORE, []);
        await AsyncStorage.setItem(LOG_WORKOUTS_STORE, []);
    } catch (error) {
        console.log(error);
    }
}



// check if database exists
export async function ExistsDatabase() {
    try {
        await AsyncStorage.getItem(DATABASE_STORE, (err, result) => {
            if (result == null || result == '') return false;
            return true;
        });
    } catch (error) {
        console.log(error);
    }
}



// delete the database
export async function DropDatabase() {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.log(error);
    }
}


function MakeStoreKey(key_store, object_key) {
    return `${key_store}/${object_key}`;
}
function MakeRelationalStoreKey(key_store, object_key, parent_key) {
    return `${key_store}/${object_key}/${parent_key}`;
}

// insert
export async function Insert(key_store, object) {
    try {
        await AsyncStorage.getItem(key_store, async (err, result) => {
            if (result == null || result == '[]') {
                // store has no data
                const objectKey = MakeStoreKey(key_store, 1);
                const storeKeys = {
                    last_key: 1,
                    store_keys: [objectKey]
                };

                const readyObject = {
                    primary_key: objectKey,
                    data: object
                }

                await AsyncStorage.setItem(key_store, JSON.stringify(storeKeys));
                await AsyncStorage.setItem(objectKey, JSON.stringify(readyObject));
                return;
            }
            // store has data
            const storeKeys = JSON.parse(result);
            let lastKey = storeKeys.last_key + 1;

            const objectKey = MakeStoreKey(key_store, lastKey);
            storeKeys.last_key = lastKey;
            storeKeys.store_keys.push(objectKey);

            const readyObject = {
                primary_key: objectKey,
                data: object
            }

            await AsyncStorage.setItem(key_store, JSON.stringify(storeKeys));
            await AsyncStorage.setItem(objectKey, JSON.stringify(readyObject));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// insert with relations
export async function InsertWithRelations(parent_key_store, child_key_store, parent, childrens) {
    try {
        await AsyncStorage.getItem(parent_key_store, async (err, result) => {
            let parentKey = null;
            
            if (result == null || result == '[]') {
                // parent store has no data
                parentKey = MakeStoreKey(parent_key_store, 1);
                const parentStoreKeys = {
                    last_key: 1,
                    store_keys: [parentKey]
                };

                const readyParent = {
                    primary_key: parentKey,
                    data: parent
                }

                await AsyncStorage.setItem(parent_key_store, JSON.stringify(parentStoreKeys));
                await AsyncStorage.setItem(parentKey, JSON.stringify(readyParent));
            }
            // parent store has data
            const parentStoreKeys = JSON.parse(result);
            let lastKey = parentStoreKeys.last_key + 1;

            parentKey = MakeStoreKey(key_store, lastKey);
            parentStoreKeys.last_key = lastKey;
            parentStoreKeys.store_keys.push(parentKey);

            const readyParent = {
                primary_key: parentKey,
                data: parent
            }

            await AsyncStorage.setItem(parent_key_store, JSON.stringify(parentStoreKeys));
            await AsyncStorage.setItem(parentKey, JSON.stringify(readyParent));
            


            await AsyncStorage.getItem(child_key_store, async (err, result) => {
                if (result == null || result == '[]') {
                    // child store has no data
                    const childStoreKeys = {
                        last_key: 0,
                        store_keys: []
                    };

                    // childrens.forEach((child) => {
                    //     const temp = child;
                    //     temp.relational_key = parentKey;

                    //     let childLastKey = childStoreKeys.last_key + 1;

                    //     const childKey = MakeStoreKey(child_key_store, childLastKey);
                    //     childStoreKeys.last_key = childLastKey;
                    //     childStoreKeys.store_keys.push(childKey);

                    //     const readyChild = {
                    //         primary_key: childKey,
                    //         data: temp
                    //     }

                    //     await AsyncStorage.setItem(childKey, JSON.stringify(readyChild));
                    // });

                    childrens.forEach((child) => {
                        let childLastKey = childStoreKeys.last_key + 1;

                        const childKey = MakeRelationalStoreKey(child_key_store, childLastKey, parentKey);
                        childStoreKeys.last_key = childLastKey;
                        childStoreKeys.store_keys.push(childKey);

                        const readyChild = {
                            primary_key: childKey,
                            data: child
                        }

                        await AsyncStorage.setItem(childKey, JSON.stringify(readyChild));
                    });

                    await AsyncStorage.setItem(child_key_store, JSON.stringify(childStoreKeys));
                    return;
                }
                // child store has data
                const childStoreKeys = JSON.parse(result);

                childrens.forEach((child) => {
                    let childLastKey = childStoreKeys.last_key + 1;
                    
                    const childKey = MakeRelationalStoreKey(child_key_store, childLastKey, parentKey);
                    childStoreKeys.last_key = childLastKey;
                    childStoreKeys.store_keys.push(childKey);

                    const readyChild = {
                        primary_key: childKey,
                        data: child
                    }

                    await AsyncStorage.setItem(childKey, JSON.stringify(readyChild));
                });

                await AsyncStorage.setItem(child_key_store, JSON.stringify(childStoreKeys));
                return;
            });
        });
    } catch (error) {
        console.log(error);
    }
}



// update
export async function Update(primary_key, rawObject) {
    try {
        const newObject = Object.fromEntries(Object.entries(rawObject).filter(([_, value]) => value != null));
 
        await AsyncStorage.getItem(primary_key, async (err, result) => {
            if (result == null || result == '[]') return; // object has no data
            // object has data
            const object = JSON.parse(result);

            const readyObject = {...object, ...newObject};
            
            await AsyncStorage.setItem(primary_key, JSON.stringify(readyObject));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// delete
export async function Delete(key_store, primary_key) {
    try {
        await AsyncStorage.removeItem(primary_key);

        await AsyncStorage.getItem(key_store, async (err, result) => {
            if (result == null || result == '[]') return; // object has no data
            // object has data
            const storeKeys = JSON.parse(result);
            const readyKeys = storeKeys.store_keys.filter((value) => {return value !== primary_key});
            await AsyncStorage.setItem(key_store, JSON.stringify(readyKeys));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}


function getRelationalKeyFromStoreKey(primary_key) {
    let relation_key = '';
    for (let i = primary_key.length - 1; i = 0; i--) {
        if(primary_key[i] == '/') {
            return parseInt(relation_key);
        }
        relation_key = `${primary_key[i]}${relation_key}`;
    }
    return relation_key;
}

// delete with relations
export async function DeleteWithRelations(parent_key_store, child_key_store, parent_key) {
    try {
        await AsyncStorage.removeItem(parent_key);

        await AsyncStorage.getItem(parent_key_store, async (err, result) => {
            if (result == null || result == '[]') return; // parent store has no data
            // parent store has data
            const parentStoreKeys = JSON.parse(result);
            const parentReadyKeys = parentStoreKeys.store_keys.filter((value) => {return value !== parent_key});
            await AsyncStorage.setItem(parent_key_store, JSON.stringify(parentReadyKeys));
            
            await AsyncStorage.getItem(child_key_store, async (err, result) => {
                if (result == null || result == '[]') return; // child store has no data
                // child store has data
                const childrenStoreKeys = JSON.parse(result);
                const childrenReadyKeys = childrenStoreKeys;

                childrenStoreKeys.store_keys.forEach((childKey) => {
                    const check = childKey.split('/').length - 1;

                    if(check > 1 && getRelationalKeyFromStoreKey(childKey) == parent_key) {
                        await AsyncStorage.removeItem(childKey);
                        childrenReadyKeys = childrenReadyKeys.store_keys.filter((value) => {return value !== childKey});
                    }
                });

                await AsyncStorage.setItem(child_key_store, JSON.stringify(childrenReadyKeys));
            });
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// select
export async function Select(primary_key, setState) {
    try {
        await AsyncStorage.getItem(primary_key, async (err, result) => {
            if (result == null || result == '[]') {
                // store has no data
                setState(null);
                return;
            }
            // store has data
            const object = JSON.parse(result);
            setState(object.data);
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// select all
export async function SelectAll(key_store, setState) {
    try {
        await AsyncStorage.getItem(key_store, async (err, result) => {
            if (result == null || result == '[]') {
                // store does not exist
                setState([]);
                return;
            }
            // store exists
            const storeKeys = JSON.parse(result);
            const readyObjects = [];

            storeKeys.store_keys.forEach((primary_key) => {
                await AsyncStorage.getItem(primary_key, async (err, result) => {
                    if (result == null || result == '[]') {
                        // store does not exist
                        return;
                    }
                    // store exists
                    const object = JSON.parse(result);
                    readyObjects.push(object);
                    return;
                });
            });

            setState(readyObjects);
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// select relations
export async function SelectRelations(key_store, parent_key, setState) {
    try {
        await AsyncStorage.getItem(key_store, async (err, result) => {
            if (result == null || result == '[]') {
                // store has no data
                setState([]);
                return;
            }
            // store has data
            const storeKeys = JSON.parse(result);
            const readyObjects = [];

            storeKeys.store_keys.forEach((primary_key) => {
                const check = primary_key.split('/').length - 1;

                if(check > 1 && getRelationalKeyFromStoreKey(primary_key) == parent_key) {
                    await AsyncStorage.getItem(key_store, async (err, result) => {
                        if (result == null || result == '[]') return; // store has no data
                        readyObjects.push(JSON.parse(result));
                    });
                }
            });

            setState(readyObjects);
            return;
        });
    } catch (error) {
        console.log(error);
    }
}