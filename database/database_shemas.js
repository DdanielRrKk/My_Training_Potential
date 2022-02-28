// users shemas =====
export const USER_DATA_SCHEMA = {
    name: null,
    age: null,
    weight: null,
    height: null,
    gender: null
};

export const USER_WORKOUTS_SCHEMA = {
    workout_goal: null, 
    total_duration: null, 
    available_days: null
};

export const USER_MEALS_SCHEMA = {
    meal_goal: null, 
    activity_level: null,
    calories_goal: null,
    carbs_goal: null,
    protein_goal: null,
    fat_goal: null
};

export const USER_PREFERENCES_SCHEMA = {
    is_workout_ready: false,
    is_meal_ready: false,
    is_user_data_ready: false
};



// meals shemas =====
export const MEAL_WATER_SCHEMA = ''; // mililiters

export const MEAL_MAIN_SCHEMA = {
    recommended_min: null,
    recommended_max: null,
    total_calories: null,
    total_carbs: null,
    total_protein: null,
    total_fat: null,
    foods: []
};

export const MEAL_CURRENT_DATA_SCHEMA = {
    water: null,
    calories: null,
    carbs: null,
    protein: null,
    fat: null,
    breakfast_cal: null,
    lunch_cal: null,
    dinner_cal: null
};



// logs shemas =====
export const LOG_SCHEMA = [];



// workout shemas =====
export const WORKOUT_SCHEMA = [];

// tips ( not for use )
export const WORKOUT_PLAN_SCHEMA = {
    key: null,
    name: null,
    description: null,
    per_week: null,
    average_time: null,
    type: null,
    gender_oriented: null,
    days: []
};

export const WORKOUT_DAY_SCHEMA = {
    key: null,
    name: null,
    exercises_count: null,
    total_time: null,
    exercises: []
};

export const WORKOUT_EXERCISE_SCHEMA = {
    key: null,
    name: null,
    type: null,
    sets: null,
    rest: null,
    is_until_failure: null,
    reps_min: null,
    reps_max: null,
    duration: null
};
