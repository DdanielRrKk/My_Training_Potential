import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";



// actions
const SET_IS_USER_READY = 'set_is_user_ready';
const SET_IS_MEAL_READY = 'set_is_meal_ready';
const SET_IS_WORKOUT_READY = 'set_is_workout_ready';

export const setUserReady = (flag) => {
    return {
        type: SET_IS_USER_READY,
        payload: flag
    };
}
export const setMealReady = (flag) => {
    return {
        type: SET_IS_MEAL_READY,
        payload: flag
    };
}
export const setWorkoutReady = (flag) => {
    return {
        type: SET_IS_WORKOUT_READY,
        payload: flag
    };
}



// reducers
const initialState = {
    isUserReady: false,
    isMealReady: false,
    isWorkoutReady: false
}

export function systemReducer(state = initialState, action) {
    switch(action.type) {
        case SET_IS_USER_READY: return { ...state, isUserReady: action.payload };
        case SET_IS_MEAL_READY: return { ...state, isMealReady: action.payload };
        case SET_IS_WORKOUT_READY: return { ...state, isWorkoutReady: action.payload };
        default: return state;
    }
}



// store
const rootReducer = combineReducers({ systemReducer });
export const Store = createStore(rootReducer, applyMiddleware(thunk));