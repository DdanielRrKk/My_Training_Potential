// users shemas =====
export const USER_DATA_SCHEMA = {
    name: null,
    age: null,
    weight: null,
    height: null,
    gender: null
}

export const USER_WORKOUTS_SCHEMA = {
    workout_goal: null, 
    total_duration: null, 
    available_days: null
}

export const USER_MEALS_SCHEMA = {
    meal_goal: null, 
    weight_goal: null, 
    calories_goal: null,
    carbs_goal: null,
    protein_goal: null,
    fat_goal: null
}

export const USER_PREFERENCES_SCHEMA = {
    current_workout_plan_key: null,
    current_meals_log_key: null,
    is_user_data_ready: false
}



// meals shemas =====
export const MEAL_WATER_SCHEMA = {
    mililiters: null
}

export const MEAL_MAIN_SCHEMA = {
    recommended_min: null,
    recommended_max: null,
    total_calories: null,
    total_carbs: null,
    total_protein: null,
    total_fat: null,
    foods: []
}