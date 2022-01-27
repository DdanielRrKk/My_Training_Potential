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



// insert
export async function Insert(store, object) {
    try {
        await AsyncStorage.getItem(store, async (err, result) => {
            if (result == null || result == '[]') {
                // store does not exist
                object.key = 1;
                const storeObjects = [object];

                await AsyncStorage.setItem(store, JSON.stringify(storeObjects));
                return;
            }
            // store exists
            const storeObjects = JSON.parse(result);
            
            let lastKey = parseInt(storeObjects[storeObjects.length - 1].key);
            object.key = lastKey + 1;
            
            storeObjects.push(object);

            await AsyncStorage.setItem(store, JSON.stringify(storeObjects));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// insert with relations
export async function InsertWithRelations(parent_store, child_store, parent, childrens) {
    try {
        await AsyncStorage.getItem(parent_store, async (err, result) => {
            if (result == null || result == '[]') {
                // parent store does not exist
                parent.key = 1;
                const storeObjects = [parent];

                await AsyncStorage.setItem(parent_store, JSON.stringify(storeObjects));
                
                await AsyncStorage.getItem(child_store, async (err, result) => {
                    if (result == null || result == '[]') {
                        // child store does not exist
                        const readyCollection = assignKeys(1, 1, childrens);
                        await AsyncStorage.setItem(child_store, JSON.stringify(readyCollection));
                        return;
                    }
                    // child store exists
                    const storeCollection = JSON.parse(result);
                    let lastChildKey = parseInt(storeCollection[storeCollection.length - 1].key);

                    const readyCollection = assignKeys(lastChildKey + 1, 1, childrens);
                    
                    const merge = [...storeCollection, ...readyCollection];
                    await AsyncStorage.setItem(child_store, JSON.stringify(merge));
                });
                return;
            }
            // parent store exists
            const storeObjects = JSON.parse(result);
            
            let lastParentKey = parseInt(storeObjects[storeObjects.length - 1].key);

            parent.key = lastParentKey + 1;
            storeObjects.push(parent);

            await AsyncStorage.setItem(parent_store, JSON.stringify(storeObjects));
            
            await AsyncStorage.getItem(child_store, async (err, result) => {
                if (result == null || result == '[]') {
                    // child store does not exist
                    const readyCollection = assignKeys(1, lastParentKey + 1, childrens);    
                    await AsyncStorage.setItem(child_store, JSON.stringify(readyCollection));
                    return;
                }
                // child store exists
                const storeCollection = JSON.parse(result);
                let lastChildKey2 = parseInt(storeCollection[storeCollection.length - 1].key);

                const readyCollection = assignKeys(lastChildKey2 + 1, lastParentKey + 1, childrens);
                
                const merge = [...storeCollection, ...readyCollection];
                await AsyncStorage.setItem(child_store, JSON.stringify(merge));
            });
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

function assignKeys(startKey, parentKey, collection) {
    const readyCollection = [];
    let keys = startKey;
    
    collection.forEach((element) => {
        const temp = element;
        temp.key = keys;
        temp.relational_key = parentKey;

        readyCollection.push(temp);
        ++keys;
    });
    
    return readyCollection;
}



// update
export async function Update(store, rawObject) {
    try {
        const object = Object.fromEntries(Object.entries(rawObject).filter(([_, value]) => value != null));
 
        await AsyncStorage.getItem(store, async (err, result) => {
            if (result == null || result == '[]') return; // object does not exist
            // object exists
            const storeObjects = JSON.parse(result);

            let arrayIndex = undefined;
            storeObjects.find((value, index) => {
                if(value.key == object.key) {
                    arrayIndex = index;
                    return true;
                }
            });

            if(arrayIndex == undefined) {
                console.log('Object not found');
                return;
            }

            storeObjects[arrayIndex] = {...storeObjects[arrayIndex], ...object};
            
            await AsyncStorage.setItem(store, JSON.stringify(storeObjects));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// delete                   ????????????????????????????
export async function Delete(store, key) {
    try {
        await AsyncStorage.getItem(store, async (err, result) => {
            if (result == null || result == '[]') return; // object does not exist
            // object exists
            const readyObjects = filterKey(JSON.parse(result), key);
            await AsyncStorage.setItem(store, JSON.stringify(readyObjects));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}

function filterKey(collection, filter_key, isRelational = false) {
    if(isRelational) {
        return collection.filter((value) => {return value.key !== filter_key});
    }
    return collection.filter((value) => {return value.relational_key !== filter_key});
}



// delete with relations
export async function DeleteWithRelations(parent_store, child_store, parent_key) {
    try {
        await AsyncStorage.getItem(parent_store, async (err, result) => {
            if (result == null || result == '[]') return; // parent store does not exist
            // parent store exists
            const readyObjects = filterKey(JSON.parse(result), parent_key);
            await AsyncStorage.setItem(parent_store, JSON.stringify(readyObjects));
            
            await AsyncStorage.getItem(child_store, async (err, result) => {
                if (result == null || result == '[]') return; // child store does not exist
                // child store exists
                const readyCollection = filterKey(JSON.parse(result), parent_key, true);
                await AsyncStorage.setItem(child_store, JSON.stringify(readyCollection));
            });
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// select
export async function Select(store, key, setState) {
    try {
        await AsyncStorage.getItem(store, async (err, result) => {
            if (result == null || result == '[]') {
                // store does not exist
                setState(null);
                return;
            }
            // store exists
            const storeObjects = JSON.parse(result);

            let arrayIndex = undefined;
            storeObjects.find((value, index) => {
                if(value.key == key) {
                    arrayIndex = index;
                    return true;
                }
            });

            if(arrayIndex == undefined) {
                console.log('Object not found');
                return;
            }

            setState(storeObjects[arrayIndex]);
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// select all
export async function SelectAll(store, setState) {
    try {
        await AsyncStorage.getItem(store, async (err, result) => {
            if (result == null || result == '[]') {
                // store does not exist
                setState([]);
                return;
            }
            // store exists
            const storeObjects = JSON.parse(result);
            setState(storeObjects);
            return;
        });
    } catch (error) {
        console.log(error);
    }
}



// select relations
export async function SelectRelations(store, relational_key, setState) {
    try {
        await AsyncStorage.getItem(store, async (err, result) => {
            if (result == null || result == '[]') {
                // store does not exist
                setState([]);
                return;
            }
            // store exists
            const storeObjects = JSON.parse(result);
            setState(storeObjects.filter((value) => value.relational_key == relational_key));
            return;
        });
    } catch (error) {
        console.log(error);
    }
}