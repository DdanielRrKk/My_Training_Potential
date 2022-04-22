export const SYSTEM_STATE_SCHEMA = 0;
/*
    0 - 
    - is_user_setup = false
    - is_meal_setup = false
    - is_workout_setup = false
    1 -
    - is_user_setup = true
    - is_meal_setup = false
    - is_workout_setup = false
    2 - 
    - is_user_setup = true
    - is_meal_setup = true
    - is_workout_setup = false
    3 - 
    - is_user_setup = true
    - is_meal_setup = false
    - is_workout_setup = true
    4 -
    - is_user_setup = true
    - is_meal_setup = true
    - is_workout_setup = true
  */

export const USER_INFO_SCHEMA = {
    name: '',
    age: null,
    weight: null,
    height: null,
    gender: null,
    activityLevel: null
};

export const USER_GOALS_SCHEMA = {
    mealGoal: null,
    caloriesGoal: null,
    carbsGoal: null,
    proteinGoal: null,
    fatGoal: null
};

export const MEAL_SCHEMA = {
    recommendedMin: null,
    recommendedMax: null,
    totalCalories: null,
    totalCarbs: null,
    totalProtein: null,
    totalFat: null,
    foods: []
};

export const WORKOUT_DAY_SCHEMA = {
    day_number: null,
    name: null,
    exercises: []
};

export const LOG_SCHEMA = [];
