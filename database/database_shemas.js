// users shemas =====
export const USER_DATA_SHEMA = {
    name: null,
    age: null,
    weight: null,
    height: null,
    gender: null
}

export const USER_WORKOUTS_SHEMA = {
    workout_goal: null, 
    time: null, 
    available_days: null,
    workout_plan_key: null
}

export const USER_MEALS_SHEMA = {
    meal_goal: null, 
    weight_goal: null, 
    calories_goal: null,
    carbs_goal: null,
    protein_goal: null,
    fat_goal: null
}

export const USER_PREFERENCES_SHEMA = {
    current_workout_plan_key: null,
    current_meals_log_key: null,
    is_user_data_ready: false
}



// meals shemas =====